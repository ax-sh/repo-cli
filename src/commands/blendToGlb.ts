import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../types'

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'blendToGlb',
  alias: ['btog'],
  run: async (toolbox) => {
    const { print, lib, parameters } = toolbox

    const blenderFile = parameters.first as string
    const glbFile = parameters.second

    const spinner = print.spin()
    const root = await import('../services/blendToGlb/blendToGlb.service')
    const result = await lib.runFromPromiseWithErrorHandlerWrapper(
      root.makeBlendFileToGlb(blenderFile, glbFile),
    )
    if (result.isErr()) {
      spinner.fail()
      throw result.error
    }
    const out = result.value
    spinner.succeed(`Done blend to glb ${blenderFile}`)

    print.highlight(`Run Out blendToGlb ${out}`)

    await toolbox.system.run('echo ni -D husky')
  },
}

export default command
