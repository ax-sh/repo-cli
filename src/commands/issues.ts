import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'issues',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../services/issues/issues.service')
    const out = await root.listIssues();
    print.highlight(`Run Out issues ${JSON.stringify(out)}`)
  },
}

export default command;
