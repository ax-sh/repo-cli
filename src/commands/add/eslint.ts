import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'eslint',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/eslint/eslint.service')
    const out = await root.addEslint();
    print.highlight(`Run Out eslint ${out}`)
    print.highlight(`Todo complete eslint`)
  },
}

export default command;
