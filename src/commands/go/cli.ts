import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'cli',
  run: async (toolbox) => {
    const { print, parameters } = toolbox
    const name = parameters.first
    const root = await import('../../services/go/go.service')
    const out = await root.addGoGitIgnore()
    if (name == null) {
      print.highlight('need a name for the go cli to make')
      return
    }
    await root.makeGoCobraCli(name)
    await root.addGoLibs()

    print.highlight(`Run Out go ${out}`)
    print.highlight(`Added deps for ${name}`)
  },
}

export default command
