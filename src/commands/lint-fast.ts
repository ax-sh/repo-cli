import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'lint-fast',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const spinner = print.spin()
    const root = await import('../services/lint-fast/lint-fast.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.addLintFast(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Todo lint-fast ${out}`)
  },
}

export default command
