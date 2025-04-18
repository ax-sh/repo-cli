import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'threejs',
  run: async (toolbox) => {
    const { print } = toolbox
    const root = await import('../../services/threejs/threejs.service')
    const spinner = print.spin(`Adding threejs libs`)
    const out = await root.run();
    spinner.succeed(`Added threejs`)
    print.highlight(`Run Out threejs ${out}`)
  },
}

export default command;
