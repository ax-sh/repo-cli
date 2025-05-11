import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'unocss',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const name = toolbox.parameters.first

    const spinner = print.spin()
    const root = await import('../services/unocss/unocss.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.rununocss(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Todo unocss ${name}`)

    print.highlight(`Run Out unocss ${out}`)

    await toolbox.system.run('echo ni -D husky')
  },
}

export default command
