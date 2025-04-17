import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'tailwind',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/tailwind/tailwind.service')
    const out = await root.addTailwindToProject();
    print.highlight(`Run Output tailwind ${out}`)
  },
}

export default command;
