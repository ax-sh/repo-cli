import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'list',
  run: async (toolbox) => {
    const { print, lib } = toolbox
    const root = await import('../../services/npm-list/npm-list.service')
    const out = await root.listNPMPackagesFromGithubRegistry();
    const spinner = print.spin(`fetching npm packages on github registry `)

    spinner.succeed(`Result for npm packages in npm registry`)
    const table = out.map((i) => {
      delete i.owner
      delete i.repository
      delete i.url
      delete i.html_url

      return { ...i, created_at: lib.elapsedTime(i.created_at.toString()), updated_at: lib.elapsedTime(i.updated_at.toString()) }
    })
    console.table(table,
    )
  },
}

export default command;
