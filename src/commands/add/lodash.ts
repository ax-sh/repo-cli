import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'lodash',
  run: async (toolbox) => {
    const { print } = toolbox
    const spinner = print.spin('Adding lodash')
    const root = await import('../../services/lodash/lodash.service')
    const out = await root.addLodash()
    spinner.succeed(`Added lodash ${out}`)
  },
}

export default command
