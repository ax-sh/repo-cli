import type { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'repo',
  run: (toolbox) => {
    const { print } = toolbox

    print.highlight('Welcome to your CLI')
  },
}

export default command
