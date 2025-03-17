import type { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'repo',
  run: (toolbox) => {
    const { print } = toolbox

    print.printHelp(toolbox)
  },
}

export default command
