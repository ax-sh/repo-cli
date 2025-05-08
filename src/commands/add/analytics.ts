import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'analytics',
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const name = parameters.first
    const spinner = print.spin()
    const root = await import('../../services/analytics/analytics.service')
    const out = await root.run()
    spinner.succeed()
    print.highlight(`Run Out analytics ${out}`)
    print.highlight(`Todo analytics ${name}`)
    await system.run('echo ni -D husky')
  },
}

export default command
