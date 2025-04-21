import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'vite-plugin-pages',
  alias: ['vite-pages', 'vite-page'],
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/vite-plugin-pages/vite-plugin-pages.service')
    const out = await root.addVitePluginPages();
    print.highlight(`Run Out vite-plugin-pages ${out}`)
  },
}

export default command;
