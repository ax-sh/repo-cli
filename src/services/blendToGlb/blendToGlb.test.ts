import type { Result } from 'neverthrow'
import type { RuntimeAppError } from '../../errors'
import {
  exeCmdWithOutput,
  runFromPromiseWithErrorHandlerWrapper,
} from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')

async function runSetupBlendToGlb(blenderFilePath: string) {
  const fn = vi.mocked(exeCmdWithOutput)

  fn.mockImplementation(async (args: string) => args)
  const mod = await import('./blendToGlb.service')
  expect(mod).toBeDefined()

  const result = await runFromPromiseWithErrorHandlerWrapper(
    mod.makeBlendFileToGlb(blenderFilePath),
  )
  return result
}

describe('[blendToGlb] service test', () => {
  let result: Result<string, RuntimeAppError>
  beforeEach(async () => {
    const blenderFilePath = 'foo.blend'
    result = await runSetupBlendToGlb(blenderFilePath)
  })

  it('should parse correctly', async () => {
    if (result.isErr()) {
      throw result.error
    }
    const out = result.value
    expect(out).toEqual(
      `/Applications/Blender.app/Contents/MacOS/Blender -b foo.blend --python-expr "import bpy; bpy.ops.export_scene.gltf(filepath='foo.blend.glb')"`,
    )
  })

  it('should correctly parse and file', async () => {
    const blenderFilePath = '/user/mpp/foo.blend'

    const result = await runSetupBlendToGlb(blenderFilePath)
    if (result.isErr()) {
      throw result.error
    }
    const out = result.value
    expect(out).toEqual(
      `/Applications/Blender.app/Contents/MacOS/Blender -b /user/mpp/foo.blend --python-expr "import bpy; bpy.ops.export_scene.gltf(filepath='foo.blend.glb')"`,
    )
  })
})
