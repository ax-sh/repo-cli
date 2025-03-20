import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'publish',
  alias: ['ts', 'js'],
  description: 'publish build dir on your github npm registry',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/npm.service')
    await root.publishToGithubPrivateRegistry()
    print.highlight('executed publish to github')
  },
}

export default command
