import path from 'node:path'
import { filesystem } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'

// /Applications/Blender.app/Contents/MacOS/Blender is the path to the Blender executable.
// -b tells Blender to run headlessly.
// input.blend is the input file.
// --python-expr is the command line flag that has Blender run the expression as Python.
// import bpy imports the Blender library into the Python script.
// bpy.ops.export_scene.gltf is the Blender API function that exports the scene as a binary glTF.
// filepath='output.glb' tells Blender to save the exported file as output.glb.

export async function makeBlendFileToGlb(
  input: string,
  output?: string | undefined,
) {
  const blenderPath = '/Applications/Blender.app/Contents/MacOS/Blender'
  if (output === undefined) {
    // console.log(input)
    const outputPath = `${path.basename(input)}.glb`
    if (filesystem.isFile(outputPath)) {
      throw new KnownError('path exists not implemented')
    }
    output = outputPath
  }
  const cmd = `${blenderPath} -b ${input} --python-expr "import bpy; bpy.ops.export_scene.gltf(filepath='${output}')"`
  const blenderConvertBlendToGlb = await exeCmdWithOutput(cmd)
  console.info(blenderConvertBlendToGlb)
  const dracoOutputPath = `${path.basename(input)}.glb`
  const dracoCmd = `bunx gltf-pipeline -i ${output} -o ${dracoOutputPath}.draco.glb`
  const dracoCmdOutput = await exeCmdWithOutput(dracoCmd)
  console.info(dracoCmdOutput)
  return dracoCmdOutput
}
