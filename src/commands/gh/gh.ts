import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'gh',
  run: async (toolbox) => {
    const { print } = toolbox

    print.printCommands(toolbox)
  },
}

export default command
