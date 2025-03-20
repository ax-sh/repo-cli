import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'list',
  alias: ['ls', 'l'],
  run: async (toolbox) => {
    const { print, parameters } = toolbox
    const lang = parameters.first

    const root = await import('../../services/gh.service')
    const out = await root.listAllPublicRepos(lang)
    print.highlight(out)
  },
}

export default command
