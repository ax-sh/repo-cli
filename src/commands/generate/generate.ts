import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'
import { KnownError } from '../../errors'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'generate',
  alias: ['g', 'gen'],
  run: async (toolbox) => {
    const { parameters, print, lib, system, template } = toolbox

    const name = parameters.first?.trim()
    if (name === null) {
      throw new KnownError('No command name found.')
    }
    const cliProjectPath = lib.appRootPath.path

    // eslint-disable-next-line node/prefer-global/process
    process.chdir(cliProjectPath)

    const commandPath = lib.appRootPath.resolve(`src/commands/${name}.ts`)
    const commandServicePath = lib.appRootPath.resolve(
      `src/services/${name}.ts`
    )
    print.info(
      `Generating subcommand [${name}] files on ${cliProjectPath} \n  ${commandPath} \n  ${commandServicePath}`
    )

    await template.generate({
      template: 'command.ts.ejs',
      target: commandPath,
      props: { name },
    })
    await template.generate({
      template: 'service.ts.ejs',
      target: commandServicePath,
      props: { name },
    })
    await system.run('nr format')
    print.printCommands(toolbox)
  },
}

export default command
