import { faker } from '@faker-js/faker/locale/ar';
import { exeCmdWithOutput } from '../../lib';
import { getJsonFromCmd } from '../../lib/helpers/cmd/cli';
import { listNPMPackagesFromGithubRegistry } from './npm-list.service';

vi.mock('../../lib/helpers/cmd/cli')

describe('[npm-list] service test', () => {
  it('should return results', async () => {
    const fn = vi.mocked(exeCmdWithOutput)
    fn.mockImplementation(async (args: string) => args)
    const mod = await import('./npm-list.service')
    expect(mod).toBeDefined()
    //
    // const out = await mod.run()
    // console.warn(out)
  });
  it('should use gh for getting npm packages from github registry', async () => {
    const cmdMock = vi.mocked(getJsonFromCmd)

    cmdMock.mockResolvedValueOnce(
      faker.helpers.multiple(() => ({
        name: faker.helpers.arrayElement(['a', 'b', 'c', 'd']),
      })),
    )
    // uncomment above to use the real thing

    const out = await listNPMPackagesFromGithubRegistry()
    const arr = out.map((i) => {
      delete i.owner
      return i
    })
    console.debug(arr)
    expect(arr).toHaveLength(3)
    console.debug(arr.map(i => i.name))
    expect(arr.length).toEqual(3)
    const [pkg] = arr

    console.debug(pkg.owner)
    console.debug(pkg.package_type)
  })
});
