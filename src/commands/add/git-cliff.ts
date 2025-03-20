import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'git-cliff',
  alias: ['cliff'],
  run: async (toolbox) => {
    const { print, template, filesystem } = toolbox

    const fileNames = ['cliff.toml']
    for (const fileName of fileNames) {
      await template.generate({
        // directory: "CONFIGS/tailwind",
        template: `/CONFIGS/git-cliff/${fileName}`,
        target: filesystem.path('.', fileName),
      })
    }
    const root = await import('../../services/git-cliff/git-cliff.service')

    const out = await root.addGitCliffScriptsToPackageJson()
    print.highlight(out)
  },
}

export default command
