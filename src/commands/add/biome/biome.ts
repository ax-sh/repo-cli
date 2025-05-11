import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'biome',
  run: async (toolbox) => {
    const { print } = toolbox

    const spinner = print.spin()
    const root = await import('../../../services/biome/biome.service')
    const out = await root.installBiomeLinter()
    spinner.succeed()

    print.highlight(`Run Out biome ${out}`)
  },
}

export default command
