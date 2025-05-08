import { google } from '@google-analytics/admin/build/protos/protos'

import { runFromPromise } from '../../errors'
import { getProperties, listAccounts } from './find-ga-account-id'
import { initializeGAAdmin } from './google-analytics'
import ICreatePropertyRequest = google.analytics.admin.v1alpha.ICreatePropertyRequest

vi.mock('../../lib/helpers/cmd/cli')

describe('[analytics] service test', () => {
  it('should list all authorized accounts for the service client_email', async () => {
    const propertiesList = await listAccounts();
    expect(propertiesList.length).toBeGreaterThan(0)
    const [properties] = propertiesList
    console.table(properties);
  })
  it('should list permissions for the service client_email', async () => {

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
