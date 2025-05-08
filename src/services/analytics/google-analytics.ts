import { AnalyticsAdminServiceClient, protos } from '@google-analytics/admin'
import appRootPath from 'app-root-path'
import { findOrCreateAccount } from './find-ga-account-id'
import { executeGooglePromise } from './handle-google-error'
import IAccount = protos.google.analytics.admin.v1alpha.IAccount
import IListPropertiesRequest = protos.google.analytics.admin.v1alpha.IListPropertiesRequest

const fileName = process.env.GOOGLE_APPLICATION_CREDENTIALS_FILE as string
const GOOGLE_APPLICATION_CREDENTIALS_FILE = appRootPath.resolve(fileName)

// Authentication - create a service account key and download the JSON
// https://console.cloud.google.com/iam-admin/serviceaccounts
// https://console.cloud.google.com/iam-admin/serviceaccounts/details/
// https://console.cloud.google.com/apis/library
// https://console.cloud.google.com/apis/library/analytics.googleapis.com
export async function initializeGAAdmin() {
  try {
    // Create a client
    const analyticsAdminClient = new AnalyticsAdminServiceClient({
      // You can use credentials JSON file or environment variables
      keyFilename: GOOGLE_APPLICATION_CREDENTIALS_FILE,
      // Alternative: use these environment variables
      // credentials: {
      //   client_email: process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
      //   private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
      // }
    })

    return analyticsAdminClient
  } catch (error) {
    console.error('Error initializing Google Analytics Admin:', error)
    throw error
  }
}

// Get all GA4 properties for your account
export async function getProperties(
  client: AnalyticsAdminServiceClient,
  accountId: number,
) {
  const params: IListPropertiesRequest = {
    filter: `parent:accounts/${accountId}`,
  }

  const result = await executeGooglePromise(client.listProperties(params))
  if (result.isErr()) {
    console.error('Error fetching GA properties:', result.error)
    throw result.error
  }
  const [properties] = result.value
  return properties
}

// Get data streams for a specific property
async function getDataStreams(propertyName) {
  const client = await initializeGAAdmin()

  try {
    // List data streams (web, iOS, Android)
    const [dataStreams] = await client.listDataStreams({
      parent: propertyName,
    })
    return dataStreams
  } catch (error) {
    console.error('Error fetching data streams:', error)
    throw error
  }
}

// Get measurement ID from a web data stream
export async function getMeasurementId(propertyName: string) {
  const dataStreams = await getDataStreams(propertyName)

  // Find the web data stream
  const webStream = dataStreams.find(
    stream => stream.type === 'WEB_DATA_STREAM',
  )

  if (webStream) {
    return webStream.webStreamData?.measurementId
  } else {
    throw new Error('No web data stream found for this property')
  }
}

function parseGoogleAdminAccountId(account: IAccount): number {
  const name = account?.name as string
  return Number(name.split('/')[1])
}

export async function generateNewToken() {
  console.debug('Generating new token for new token:')
  const client = await initializeGAAdmin()
  const result = await executeGooglePromise(findOrCreateAccount(client))
  if (result.isErr()) {
    throw result.error
  }
  const account = result.value!
  const accountId = parseGoogleAdminAccountId(account)
  console.info(accountId)
  console.info(account)
}

export async function listAccountProperties(
  client: AnalyticsAdminServiceClient,
) {
  const result = await executeGooglePromise(findOrCreateAccount(client))
  if (result.isErr()) {
    throw result.error
  }
  const account = result.value!
  const accountId = parseGoogleAdminAccountId(account)

  const properties = await getProperties(client, accountId)
  return properties
}
