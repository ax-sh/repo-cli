import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'go',
  run: async (toolbox) => {
    const { print, parameters } = toolbox
    const name = parameters.first
    const root = await import('../../services/go/go.service')
    let out: string
    out = await root.addGoLibs()
    print.info(out)
    out = await root.addCodeQualityTools()
    print.highlight(`Run Out go ${out}`)
    print.highlight(`Todo go ${name}`)
  },
}

export default command
