import { print } from 'gluegun'

// name: 'knip',
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const knipConfigFileContents = `
 import type {KnipConfig} from 'knip';
  const config: KnipConfig = {
    "$schema": "https://unpkg.com/knip@5/schema.json",
    "entry": ["src/index.ts", "scripts/{build,create}.js"],
    "project": ["src/**/*.ts", "scripts/**/*.js"]
  }
  export default config;
`
const knipConfigFile = 'knip.config.ts'

export async function addKnip(input?: unknown) {
  const hasError = Boolean(input)
  if (hasError) {
    await wait(1000)
    const error = 'todo handle error knip '
    return error
  }

  console.debug('doing')
  print.info('done')
  let out: string
  out = 'Run something knip out'
  out = 'todo handle success knip out'
  return out
}
