import { print } from 'gluegun'
import { err, ok } from 'neverthrow'

export async function getRepoUrl(input?: unknown) {
  const hasError = input
  if (hasError) {
    console.debug(
      'todo add ability to get git repo url the fastest way possible',
    )
    return err('getRepoUrl')
  }

  print.info('done')
  const out = 'out'
  return ok(out)
}
