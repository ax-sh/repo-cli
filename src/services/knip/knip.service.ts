import { filesystem } from 'gluegun'

const knipConfigFileContents = `

`
const knipConfigFile = './knip.config.ts'

export async function addKnip() {
  filesystem.write(knipConfigFile, knipConfigFileContents)
  // const hasError = Boolean(input)
  // if (hasError) {
  //   await wait(1000)
  //   const error = 'todo handle error knip '
  //   return error
  // }
  //
  // console.debug('doing')
  // print.info('done')
  let out: string
  out = 'Run something knip out'
  out = 'todo handle success knip out'
  return out
}
