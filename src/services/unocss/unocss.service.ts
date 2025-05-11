import { print } from 'gluegun'
import { err, ok } from 'neverthrow'

// name: 'unocss',
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function rununocss(input?: unknown) {
  const hasError = Boolean(input)
  if (hasError) {
    await wait(1000)
    const error = 'todo handle error unocss '
    return err(error)
  }

  console.debug('doing')
  print.info('done')
  let out: string
  out = 'Run something unocss out'
  out = 'todo handle success unocss out'
  return ok(out)
}
