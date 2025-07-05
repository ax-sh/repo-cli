import type { Result } from 'neverthrow'
import type { RuntimeAppError } from '../../errors'
import {
  exeCmdWithOutput,
  runFromPromiseWithErrorHandlerWrapper,
} from '../../lib'
import { macBlenderPath } from './blendToGlb.service'

vi.mock('../../lib/helpers/cmd/cli')

const fn = vi.mocked(exeCmdWithOutput)

fn.mockImplementation(async (args: string) => args)

async function runSetupBlendToGlb(blenderFilePath: string) {
  const mod = await import('./blendToGlb.service')
  expect(mod).toBeDefined()
  // neverthrow ResultAsync.fromPromise wrapper
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
    expect(fn).toBeCalledTimes(2)
    const expected = `${macBlenderPath} -b foo.blend --python-expr "import bpy; bpy.ops.export_scene.gltf(filepath='foo.blend.glb')"`
    expect(fn).toHaveBeenNthCalledWith(1, expected)
    expect(out).toEqual(
      'bunx gltf-pipeline -i foo.blend.glb -o foo.blend.glb.draco.glb',
    )
  })

  it.todo('should correctly parse and file from arbitrary folder', async () => {
    const blenderFilePath = '/user/mpp/foo.blend'

    const result = await runSetupBlendToGlb(blenderFilePath)
    if (result.isErr()) {
      throw result.error
    }
    const out = result.value
    const expected = `${macBlenderPath} -b /user/mpp/foo.blend --python-expr "import bpy; bpy.ops.export_scene.gltf(filepath='foo.blend.glb')"`
    expect(fn).toHaveBeenNthCalledWith(1, expected)
    expect(fn).toBeCalledTimes(2)
    expect(out).toEqual('bunx gltf-pipeline -i foo.blend.glb -o foo.blend.glb.draco.glb')
  })
})
