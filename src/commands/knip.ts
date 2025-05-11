import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'knip',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const name = toolbox.parameters.first

    const spinner = print.spin()
    const root = await import('../services/knip/knip.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(root.addKnip())
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Todo knip ${name}`)

    print.highlight(`Run Out knip ${out}`)

    await toolbox.system.run('echo ni -D husky')
  },
}

export default command
