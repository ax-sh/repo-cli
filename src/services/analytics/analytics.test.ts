import { listAccounts } from './track-google-analytics/find-ga-account-id'
import {
  generateNewToken,
  initializeGAAdmin,
  listAccountProperties,
} from './track-google-analytics/google-analytics'

vi.mock('../../lib/helpers/cmd/cli')

describe('[analytics] service test', () => {
  it('should list all authorized accounts for the service client_email', async () => {
    const propertiesList = await listAccounts()
    expect(propertiesList.length).toBeGreaterThan(0)
    const [properties] = propertiesList
    console.table(properties)
  })
  it('should list permissions for the service client_email', async () => {})

  it('should list properties from the found account', async () => {
    const client = await initializeGAAdmin()
    const properties = await listAccountProperties(client)
    console.table(properties)
    expect(properties).toHaveLength(1)
  })
  // only enable to mass delete properties
  // it.todo('should delete all properties', async () => {
  //   const client = await initializeGAAdmin()
  //   // const parentAccount = process.env.MAIN_ANALYTICS_ACCOUNT
  //
  //   const [properties] = await listAccountPropertiesWithAccountName(client, parentAccount)
  //   const notDeleted = properties.filter(i => i.deleteTime !== null)
  //   console.debug('property', notDeleted, properties)
  //   for (const v of notDeleted) {
  //     const r = await client.deleteProperty({ name: v.name })
  //
  //     console.log('deleted', r)
  //   }
  //
  //   expect(1).toBe(1)
  // }, { timeout: 400000 })

  it(
    'should create new tracking token',
    async () => {
      const displayName = 'My Website alpha'
      const url = 'http://example.foo'
      const dataStream = await generateNewToken(displayName, url)
      console.debug('Final data =>', dataStream)
      console.info(
        'ReactGA4 initialized with measurement ID:',
        dataStream?.webStreamData,
      )
      const measurementId = dataStream?.webStreamData
      expect(measurementId).not.toEqual(undefined)
    },
    { timeout: 500000 },
  )
  // const measurementId = await getMeasurementId(propertyName);
  // it('should return results', async () => {
  //   const fn = vi.mocked(exeCmdWithOutput)
  //   fn.mockImplementation(async (args: string) => args)
  //   const mod = await import('./analytics.service')
  //   expect(mod).toBeDefined()
  //
  //   const out = await mod.run()
  //   console.warn(out)
  // })
})
