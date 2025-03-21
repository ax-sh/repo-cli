import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types';
import spacetime from 'spacetime';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'issues',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../services/issues/issues.service')
    const out = await root.listIssues();

    // enableConsoleDepth()
    const now = spacetime.now()
    const items = out.map(i => ({ ...i,
      //
      createdAt: now.since(spacetime(i.createdAt)).rounded,
      //
      updated: now.since(spacetime(i.updatedAt)).rounded, updatedAt: spacetime(i.updatedAt).format('nice'),
      //   time
      author: `${i.author.login}|${i.author.name}` /* d */ }))

    console.table(items)
    print.highlight('gh issue list  --help')
  },
}

export default command;
