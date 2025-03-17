import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'publish',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/npm.service')
    await root.publishToGithubPrivateRegistry()
    print.highlight(`Todo npm`)
  },
}

export default command
