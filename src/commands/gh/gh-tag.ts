import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'gh-tag',
  alias: 'tag',
  run: async (toolbox) => {
    const { print } = toolbox

    // const root = await import('../../services/gh-tag.service')
    // await root.run()
    print.highlight(`Todo gh-tag `)
  },
}

export default command
