import type { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'repo',
  run: (toolbox) => {
    const { print } = toolbox

    print.printHelp(toolbox)
    print.highlight('USE repo --compiled-build TO USE BUILT VERSION')
  },
}

export default command
