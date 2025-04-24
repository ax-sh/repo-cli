import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types';
import { KnownError } from '../errors'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'renovate',
  run: async (toolbox) => {
    const { print, lib } = toolbox
    const cmd = 'bunx renovate --platform=github --token $(gh auth token) $(gh repo view --json nameWithOwner -q .nameWithOwner)'
    // const cmd = 'bunx renovate --token $(gh auth token) --autodiscover'
    print.highlight(cmd)
    const spinner = print.spin('Running renovate on current repo')
    try {
      const out = await lib.exeCmdWithOutput(cmd)
      print.info('renovate')
      spinner.succeed('Done')
      print.highlight(out)
    }
    catch (e) {
      spinner.fail(`error ${e}`)
      const error = e as Error
      throw new KnownError(error.message)
    }
    finally {
      spinner.stop()
    }
  },
}

export default command;
