import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'git-cliff',
  alias: ['cliff'],
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/git-cliff.service')
    const out = await root.addGitCliffScriptsToPackageJson()
    print.highlight(out)
  },
}

export default command
