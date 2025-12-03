import { print } from 'gluegun'
import { ok } from 'neverthrow'

export async function makeDefaultMonoRepoWorkspace(name?: string) {
  // const hasError = !name
  // if (hasError) {
  //   const error = 'todo handle error mono '
  //   return err(error)
  // }
  // const { $ } = await import('execa')
  const cmdTemplate = `bunx create-nx-workspace@latest ${name} --interactive false --dry-run`
  const cmd = cmdTemplate
  console.debug(cmd)
  print.info('done')
  let out: string
  // const { stdout } = await $`${cmd}`
  // out = stdout

  return ok(out)
}
