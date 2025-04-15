import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'who',
  description: 'print who is currently logged in with auth in github',
  run: async (toolbox) => {
    const { print } = toolbox

    const npm = await import('../../services/npm/npm.service')

    const who = await npm.whoamiGithub()

    print.info(`github ${who}`)
  },
}

export default command
