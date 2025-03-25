import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'tools',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/go/go.service')
    const out = await root.addCodeQualityTools()
    print.highlight(out)
  },
}

export default command
