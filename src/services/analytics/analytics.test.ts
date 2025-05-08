import { listAccounts } from './find-ga-account-id'
import { generateNewToken, initializeGAAdmin, listAccountProperties } from './google-analytics'

vi.mock('../../lib/helpers/cmd/cli')

describe('[analytics] service test', () => {
  it('should list all authorized accounts for the service client_email', async () => {
    const propertiesList = await listAccounts()
    expect(propertiesList.length).toBeGreaterThan(0)
    const [properties] = propertiesList
    console.table(properties)
  })
  it('should list permissions for the service client_email', async () => {})

  it('should create new tracking token', async () => {
    const displayName = 'My Website'
    const measurementId = await generateNewToken(displayName)
    console.info('ReactGA4 initialized with measurement ID:', measurementId)
    expect(measurementId).not.toEqual(undefined)
  })
  it('should list properties from the found account', async () => {
    const client = await initializeGAAdmin()
    const properties = await listAccountProperties(client)
    expect(properties).toHaveLength(1)
  })

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
