import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'info',
  run: async (toolbox) => {
    const root = await import('../services/info/info.service')
    await root.getInfo();
  },
}

export default command;
