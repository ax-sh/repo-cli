import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'path',
  run: async (toolbox) => {
    const { print, lib } = toolbox
    const spinner = print.spin(`Location`)
    const cliProjectPath = lib.appRootPath.path

    spinner.succeed(`Repo local location: ${cliProjectPath}`)
  },
}

export default command
