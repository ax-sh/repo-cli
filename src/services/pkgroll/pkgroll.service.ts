import { print } from 'gluegun'
import { err, ok } from 'neverthrow'

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
async function addDependencies(force: number) {
  // npm pkg set main="./dist/index.cjs"
  // npm pkg set module="./dist/index.mjs"
  // npm pkg set types="./dist/index.d.cts"
  // npm pkg set exports.require.types="./dist/index.d.cts"
  // npm pkg set exports.require.default="./dist/index.cjs"
  // npm pkg set exports.import.types="./dist/index.d.mts"
  // npm pkg set exports.import.default="./dist/index.mjs"
}

export async function runpkgroll(input?: unknown) {
  const hasError = Boolean(input)
  if (hasError) {
    await addDependencies(1000)
    const error = 'todo handle error pkgroll '
    return err(error)
  }

  console.debug('doing')
  print.info('done')
  let out: string
  out = 'Run something pkgroll out'
  out = 'todo handle success pkgroll out'
  return ok(out)
}
