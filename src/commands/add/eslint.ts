import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'eslint',
  alias: ['linter'],
  run: async (toolbox) => {
    const { print } = toolbox
    const spinner = print.spin()
    spinner.info('Adding eslint')
    const root = await import('../../services/eslint/eslint.service')
    const out = await root.addEslint()
    spinner.succeed()
    print.highlight(`Added Eslint ${out}`)
  },
}

export default command
