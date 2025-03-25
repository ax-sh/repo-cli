import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'prettier',
  alias: ['pretty'],
  run: async (toolbox) => {
    const { print, system, template, filesystem } = toolbox

    const spinner = print.spin('Adding prettier deps')

    await toolbox.lib.exeCmdWithOutput(
      'ni -D prettier pretty-quick @trivago/prettier-plugin-sort-imports',
    )
    await toolbox.lib.addScriptToPackageJson('prettier', 'prettier . --check')
    await toolbox.lib.addScriptToPackageJson(
      'prettier:fix',
      'prettier . --write',
    )
    await toolbox.lib.addScriptToPackageJson('pretty', 'pretty-quick')

    spinner.info('Added prettier deps')

    const fileNames = ['.prettierrc', '.prettierignore']
    for (const fileName of fileNames) {
      await template.generate({
        // directory: "CONFIGS/tailwind",
        template: `/CONFIGS/prettier/${fileName}`,
        target: filesystem.path('.', fileName),
      })
    }

    spinner.info('Added prettier configs')
    spinner.stopAndPersist()
    await system.run('nr prettier . --write')

    // const root = await import('../services/prettier.service')
    // await root.run();
  },
}

export default command
