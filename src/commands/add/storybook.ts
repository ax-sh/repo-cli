import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'storybook',
  run: async (toolbox) => {
    const { print } = toolbox

    const root = await import('../../services/storybook/storybook.service')
    const out = await root.addStorybookToRepo()
    print.highlight(`Run Out storybook ${out}`)
  },
}

export default command
