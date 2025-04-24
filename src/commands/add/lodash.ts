import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'lodash',
  run: async (toolbox) => {
    const { print } = toolbox
    const root = await import('../../services/lodash/lodash.service')
    const out = await root.addLodash()
    print.highlight(`Run Out lodash ${out}`)
  },
}

export default command
