import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'
import { addScriptToPackageJson } from '../../lib'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'lint-fast',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const spinner = print.spin()
    const root = await import('../../services/lint-fast/lint-fast.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.addLintFast(),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value

    await addScriptToPackageJson('lint', 'nr oxlint --type-aware')
    await addScriptToPackageJson('fmt', 'oxfmt')
    await addScriptToPackageJson('lint:types', 'tsgo --noEmit')
    await addScriptToPackageJson('format', 'nr fmt && nr lint')
    spinner.succeed(`Added lint-fast ${out}`)
  },
}

export default command
