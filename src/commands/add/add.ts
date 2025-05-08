import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'add',
  run: async (toolbox) => {
    const { print, parameters, prompt } = toolbox
    const commandName = parameters.first?.trim()
    if (commandName == null) {
      print.printHelp(toolbox)
      print.highlight('USE repo --compiled-build TO USE BUILT VERSION')
      return
    }
    const confirmed = await prompt.confirm(`[${commandName}] Command does not exist, create it?`)
    if (confirmed) {
      const spinner = print.spin()
      // const root = await import('../../services/analytics/analytics.service')
      // const out = await root.run()
      spinner.succeed(`TODO Out ADD new command ${commandName}`)
      spinner.stop()
    }
  },
}

export default command
