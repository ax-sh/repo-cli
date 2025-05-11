import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'pkgroll',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const spinner = print.spin()
    const root = await import('../services/pkgroll/pkgroll.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.addPkgrollDeps(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value

    print.highlight(`Run Out pkgroll ${out}`)
  },
}

export default command
