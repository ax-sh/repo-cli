import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'vite-plugins',
  run: async (toolbox) => {
    const { print } = toolbox
    const root = await import(
      '../../services/vite-plugins/vite-plugins.service'
    )
    const out = await root.addDefaultVitePlugins()
    print.highlight(`Run Out vite-plugins ${out}`)
  },
}

export default command
