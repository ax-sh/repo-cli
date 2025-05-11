import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'url',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const spinner = print.spin()
    const root = await import('../services/url/url.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(root.getRepoUrl())
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    spinner.info('Getting repo url')

    const repoUrl = result.value
    spinner.succeed(repoUrl)
  },
}

export default command
