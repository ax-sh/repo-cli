import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'issues',
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const name = parameters.first
    const root = await import('../services/issues/issues.service')
    const out = await root.listIssues();
    print.highlight(`Run Out issues ${out}`)
    print.highlight(`Todo issues ${name}`)
    await system.run('echo ni -D husky')
  },
}

export default command;
