import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'add',
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const commandName = parameters.first?.trim()
    if (commandName == null) {
      print.printHelp(toolbox)
      print.highlight('USE repo --compiled-build TO USE BUILT VERSION')
      return
    }
    const spinner = print.spin()
    const root = await import('../../services/analytics/analytics.service')
    const out = await root.run()
    spinner.succeed()
    print.highlight(`TODO Out ADD ${out}`)
    await system.run('echo ni -D husky')
  },
}

export default command
