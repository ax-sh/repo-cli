import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'git-who',
  alias: ['who'],
  run: async (toolbox) => {
    const { print, system } = toolbox
    const out = await system.run('git shortlog -sne --all')
    print.success('Git Contributors')
    print.highlight(out);
  },
}

export default command
