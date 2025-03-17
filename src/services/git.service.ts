// name: 'git',
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export async function run() {
  await wait(1000)
  console.log('doing')
}
