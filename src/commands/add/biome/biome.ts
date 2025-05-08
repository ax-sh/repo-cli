import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'biome',
  run: async (toolbox) => {
    const {
      print,

      system,
    } = toolbox

    const spinner = print.spin()
    const root = await import('../../../services/biome/biome.service')
    const out = await root.run()
    spinner.succeed()

    print.highlight(`Run Out biome ${out}`)

    await system.run('echo ni -D husky')
  },
}

export default command
