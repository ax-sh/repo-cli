import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'extend',
  description: 'Open project on a webstorm editor for further extension',
  run: async (toolbox) => {
    const { print, system, lib } = toolbox
    print.highlight('Opening project dir on a webstorm editor')
    const repoPath = lib.appRootPath.path

    await system.run(`webstorm ${repoPath}`)
  },
}

export default command
