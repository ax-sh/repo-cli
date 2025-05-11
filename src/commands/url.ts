import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'url',
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox

    const name = parameters.first

    const spinner = print.spin()
    const root = await import('../services/url/url.service')
    const out = await root.run()
    spinner.succeed()

    print.highlight(`Run Out url ${out}`)
    print.highlight(`Todo url ${name}`)

    await system.run('echo ni -D husky')
  },
}

export default command
