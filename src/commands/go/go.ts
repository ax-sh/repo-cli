import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'go',
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const name = parameters.first
    const root = await import('../../services/go/go.service')
    const out = await root.addCodeQualityTools()
    print.highlight(`Run Out go ${out}`)
    print.highlight(`Todo go ${name}`)
    await system.run('echo ni -D husky')
  },
}

export default command
