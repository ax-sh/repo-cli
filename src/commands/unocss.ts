import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'unocss',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const spinner = print.spin()
    const root = await import('../services/unocss/unocss.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.addUnoCssToRepo(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Todo unocss ${out} `)
  },
}

export default command
