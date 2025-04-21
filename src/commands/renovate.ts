import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'renovate',
  run: async (toolbox) => {
    const { print, lib } = toolbox
    const out = await lib.exeCmdWithOutput('bunx renovate --token $(gh auth token) --autodiscover')
    const spinner = print.spin('Running renovate on all the allowed repos')
    print.info('renovate')
    spinner.succeed('Done')
    print.highlight(out)
  },
}

export default command;
