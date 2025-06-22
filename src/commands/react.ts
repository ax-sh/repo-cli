import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'react',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const name = toolbox.parameters.first

    const spinner = print.spin()
    const root = await import('../services/react/react.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.makeReactProject(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Todo react ${name}`)

    print.highlight(`Run Out react ${out}`)

    await toolbox.system.run('echo ni -D husky')
  },
}

export default command
