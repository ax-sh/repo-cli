import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'tag',
  run: async (toolbox) => {
    const { print } = toolbox
    const root = await import('../../services/git.service')
    const version = await root.gitCliffBumpedVersion()
    print.highlight(`Git cliff next ${version}`)
  },
}

export default command
