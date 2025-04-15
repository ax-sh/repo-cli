import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'who',
  description: 'print who is currently logged in with auth in github',
  run: async (toolbox) => {
    const { print } = toolbox

    const npm = await import('../../services/npm.service')
    const whoami = await npm.whoamiGithub()
    // print.highlight(`github ${whoami}`)
  },
}

export default command
