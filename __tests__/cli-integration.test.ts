import { filesystem, system } from 'gluegun'

const src = filesystem.path(__dirname, '..')

async function cli(cmd: string) {
  return system.run(`node ${filesystem.path(src, 'bin', 'repo')} ${cmd}`)
}
const VERSION = filesystem.read('CURRENT_VERSION.txt');

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain(VERSION)
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain(VERSION)
})

test.todo('generates file', async () => {
  const output = await cli('generate foo')

  expect(output).toContain('Generated file at models/foo-model.ts')
  const foomodel = filesystem.read('models/foo-model.ts')

  expect(foomodel).toContain(`module.exports = {`)
  expect(foomodel).toContain(`name: 'foo'`)

  // cleanup artifact
  filesystem.remove('models')
})
