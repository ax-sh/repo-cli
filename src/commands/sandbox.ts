import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'sandbox',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const name = toolbox.parameters.first

    const spinner = print.spin()
    const root = await import('../services/sandbox/sandbox.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.makePythonSandbox(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Todo sandbox ${name}`)

    print.highlight(`Run Out sandbox ${out}`)

    await toolbox.system.run('echo ni -D husky')
  },
}

export default command
