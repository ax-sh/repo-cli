import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'renovate',
  run: async (toolbox) => {
    const { print, lib } = toolbox
    const cmd = 'bunx renovate --platform=github --token $(gh auth token) $(gh repo view --json nameWithOwner -q .nameWithOwner)'
    // const cmd = 'bunx renovate --token $(gh auth token) --autodiscover'
    print.highlight(cmd)
    const out = await lib.exeCmdWithOutput(cmd)
    const spinner = print.spin('Running renovate on all the allowed repos')
    print.info('renovate')
    spinner.succeed('Done')
    print.highlight(out)
  },
}

export default command;
