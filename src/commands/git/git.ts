import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'git',
  run: async (toolbox) => {
    const { print } = toolbox
    const root = await import('../../services/git/git.service')
    const url = await root.getRepoUrl()
    print.highlight(`Github url ${url}`)
  },
}

export default command
