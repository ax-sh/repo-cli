import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'pkgroll',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const name = toolbox.parameters.first

    const spinner = print.spin()
    const root = await import('../services/pkgroll/pkgroll.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.runpkgroll(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Todo pkgroll ${name}`)

    print.highlight(`Run Out pkgroll ${out}`)

    await toolbox.system.run('echo ni -D husky')
  },
}

export default command
