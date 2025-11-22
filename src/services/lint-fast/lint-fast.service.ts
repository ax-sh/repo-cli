import { exeCmdWithOutput } from '../../lib'

export async function addLintFast() {
  // tsgo
  const out = await exeCmdWithOutput(
    `ni -D oxfmt@latest oxlint@latest oxlint-tsgolint@latest @typescript/native-preview`,
  )
  return out
}

//
// export async function runlint-fast(input?: unknown) {
//  const hasError = Boolean(input)
//  if (hasError) {
//   await wait(1000)
//   const error = 'todo handle error lint-fast '
//   return err(error)
//  }
//
//  console.debug('doing')
//  print.info("done")
//  let out: string
//  out = "Run something lint-fast out"
//  out = "todo handle success lint-fast out"
//  return ok(out)
// }
