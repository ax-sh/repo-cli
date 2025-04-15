import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'gh-pages',
  alias: ['gh-page'],
  description: 'adds config to vitest react for gh-page deploy compatible',
  run: async (toolbox) => {
    const { print } = toolbox

    const gh = await import('../../services/gh-pages/gh-pages.service')
    const spinner = print.spin('Adding gh-pages')
    try {
      await gh.checkIfPushedToRemote()
      await gh.addDependencies()
      await gh.configViteConfigForGhPages('')
    }
    catch (e) {
      print.error(e)
    }

    spinner.fail(`Todo gh-pages`)
  },
}

export default command
