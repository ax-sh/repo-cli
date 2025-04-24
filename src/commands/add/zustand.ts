import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'zustand',
  run: async (toolbox) => {
    const { print, parameters, system } = toolbox
    const name = parameters.first
    const root = await import('../../services/zustand/zustand.service')
    const out = await root.addZustand()
    print.highlight(`Run Out zustand ${out}`)
    print.highlight(`Todo zustand ${name}`)
    await system.run('echo ni -D husky')
  },
}

export default command
