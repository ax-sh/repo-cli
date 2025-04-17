import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'vitest',
  run: async (toolbox) => {
    const { print } = toolbox
    const mod = await import('../../../services/vitest/vitest.service')

    const out = await mod.addVitestDeps()

    print.highlight(`Added vitest deps ${out}`)
  },
}

export default command;
