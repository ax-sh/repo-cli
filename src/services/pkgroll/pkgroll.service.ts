import { print } from 'gluegun'
import { err, ok } from 'neverthrow'

// name: 'pkgroll',
async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function runpkgroll(input?: unknown) {
  const hasError = Boolean(input)
  if (hasError) {
    await wait(1000)
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
