import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'react',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../../services/vitest/vitest.service')
    const out = await root.addVitestWithReactTesting();
    print.highlight(`Run Out vitest ${out}`)
  },
}

export default command;
