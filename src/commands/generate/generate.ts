import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'
import { KnownError } from '../../errors'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'generate',
  alias: ['g', 'gen'],
  description: 'Generate and Add new command to this repo',
  run: async (toolbox) => {
    const { parameters, print, lib, system, template } = toolbox

    const name = parameters.first?.trim()
    if (name == null) {
      throw new KnownError('No command name provided.')
    }
    const cliProjectPath = lib.appRootPath.path

    // eslint-disable-next-line node/prefer-global/process
    process.chdir(cliProjectPath)
    const path = lib.generateNewCmdPath(name)

    print.info(`
    Generating subcommand [${name}] files on ${cliProjectPath} 
        ${path.command}
        ${path.service}
        ${path.test}
    `)
    const props = { name }

    await template.generate({
      template: 'command.ts.ejs',
      target: path.command,
      props,
    })
    await template.generate({
      template: 'service.ts.ejs',
      target: path.service,
      props,
    })
    await template.generate({
      template: 'test.ts.ejs',
      target: path.test,
      props,
    })
    await system.run('nr lint:fix')
    print.printCommands(toolbox)
  },
}

export default command
