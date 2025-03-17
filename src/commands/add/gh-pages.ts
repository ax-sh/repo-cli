import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'gh-pages',
  alias: ['gh-page'],
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const name = parameters.first
    const root = await import('../../services/gh-pages.service')
    await root.checkIfPushedToRemote()
    const spinner = print.spin('Adding gh-pages')
    await system.run('ni -D rimraf gh-pages')

    spinner.fail(`Todo gh-pages ${name}`)
  },
}

export default command
