import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'gh-tag',
  alias: 'tag',
  description: 'tags the repo using git cliff bumped version and uses gh to create a release',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/gh.service')
    const out = await root.tagRepoAndRelease()
    print.highlight(out)
  },
}

export default command
