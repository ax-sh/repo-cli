import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'migrate',
  run: async (toolbox) => {
    const { print } = toolbox

    const spinner = print.spin()
    const root = await import('../../../services/biome/biome.service')
    const out = await root.runMigrate()
    spinner.succeed()

    print.highlight(`Run ddd biome ${out}`)
  },
}

export default command
