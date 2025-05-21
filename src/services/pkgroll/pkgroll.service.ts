import { err, ok } from 'neverthrow'
import { addScriptToPackageJson, exeCmdWithOutput } from '../../lib'

// # Check and set main
// if [ "$(npm pkg get main)" = "undefined" ]; then
//   npm pkg set main="./dist/index.cjs"
// fi
//
// # Check and set module
// if [ "$(npm pkg get module)" = "undefined" ]; then
//   npm pkg set module="./dist/index.mjs"
// fi
//
// # Check and set types
// if [ "$(npm pkg get types)" = "undefined" ]; then
//   npm pkg set types="./dist/index.d.cts"
// fi
//
// # Check and set exports.require.types
// if [ "$(npm pkg get exports.require.types)" = "undefined" ]; then
//   npm pkg set exports.require.types="./dist/index.d.cts"
// fi
//
// # Check and set exports.require.default
// if [ "$(npm pkg get exports.require.default)" = "undefined" ]; then
//   npm pkg set exports.require.default="./dist/index.cjs"
// fi
//
// # Check and set exports.import.types
// if [ "$(npm pkg get exports.import.types)" = "undefined" ]; then
//   npm pkg set exports.import.types="./dist/index.d.mts"
// fi
//
// # Check and set exports.import.default
// if [ "$(npm pkg get exports.import.default)" = "undefined" ]; then
//   npm pkg set exports.import.default="./dist/index.mjs"
// fi
// https://github.com/privatenumber/pkgroll
async function addDependencies(force: boolean) {
  if (!force) {
    console.debug('todo do without checking doing')
  }
  await exeCmdWithOutput('ni -D pkgroll')
  await addScriptToPackageJson('build', 'pkgroll')
  await exeCmdWithOutput('npm pkg set main="./dist/index.cjs"')
  await exeCmdWithOutput('npm pkg set module="./dist/index.mjs"')
  await exeCmdWithOutput('npm pkg set types="./dist/index.d.cts"')
  await exeCmdWithOutput(
    'npm pkg set exports.require.types="./dist/index.d.cts"',
  )
  await exeCmdWithOutput(
    'npm pkg set exports.require.default="./dist/index.cjs"',
  )
  await exeCmdWithOutput(
    'npm pkg set exports.import.types="./dist/index.d.mts"',
  )
  await exeCmdWithOutput(
    'npm pkg set exports.import.default="./dist/index.mjs"',
  )
}

export async function installPkgrollToRepo(input?: unknown) {
  const hasError = Boolean(input)
  if (hasError) {
    const error = 'todo handle error pkgroll '
    return err(error)
  }
  await addDependencies(false)
  let out: string
  out = 'Run something pkgroll out'
  out = 'todo handle success pkgroll out'
  return ok(out)
}
