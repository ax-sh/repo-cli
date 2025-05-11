import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'url',
  run: async (toolbox) => {
    const { print } = toolbox

    const spinner = print.spin()
    const root = await import('../services/url/url.service')
    const repoUrl = await root.getRepoUrl()
    spinner.succeed()

    print.highlight(`todo get repo url  ${repoUrl}`)
  },
}

export default command
