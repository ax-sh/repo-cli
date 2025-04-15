import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'gh-pages',
  alias: ['gh-page'],
  description: 'adds config to vitest react for gh-page deploy compatible',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const root = await import('../../services/gh-pages/gh-pages.service')
    await root.checkIfPushedToRemote()
    const spinner = print.spin('Adding gh-pages')
    await lib.exeCmdWithOutput('ni -D rimraf gh-pages')

    spinner.fail(`Todo gh-pages`)
  },
}

export default command
