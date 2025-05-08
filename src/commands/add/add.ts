import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'add',
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const name = parameters.first?.trim()
    if (name == null) {
      console.log('dooo')
      return 'sooo'
    }
    const spinner = print.spin()
    const root = await import('../../services/analytics/analytics.service')
    const out = await root.run()
    spinner.succeed()
    print.highlight(`aaaaRun Out analytics ${out}`)
    print.highlight(`Todo analytics ${name}`)
    await system.run('echo ni -D husky')
  },
}

export default command
