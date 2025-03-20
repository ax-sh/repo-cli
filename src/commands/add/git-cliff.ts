import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'git-cliff',
  alias: ['cliff'],
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const name = parameters.first
    const root = await import('../../services/git-cliff.service')
    await root.run()
    print.highlight(`Todo git-cliff ${name}`)
    await system.run('echo ni -D husky')
  },
}

export default command
