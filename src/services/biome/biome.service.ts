import { print } from 'gluegun'
// name: 'biome',
async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export async function run() {
  await wait(1000)
  console.debug('doing')
  print.info('done')
  const out = 'out'
  return out
}
