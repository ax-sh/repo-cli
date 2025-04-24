import { exeCmdWithOutput } from '../../lib'

vi.mock('../../lib/helpers/cmd/cli')

describe('[tailwind] service test', () => {
  it.fails(
    'should fail as this repo does not have vite config results',
    async () => {
      const fn = vi.mocked(exeCmdWithOutput)
      fn.mockImplementation(async (args: string) => args)
      const mod = await import('./tailwind.service')
      expect(mod).toBeDefined()

      const out = await mod.addTailwindToViteProject()
      console.warn(out)
    },
  )
})
