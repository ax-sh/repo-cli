import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'mono',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const name = toolbox.parameters.first

    const spinner = print.spin()
    const root = await import('../services/mono/mono.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.makeDefaultMonoRepoWorkspace(name),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Done mono ${name}`)

    print.highlight(out)
  },
}

export default command
