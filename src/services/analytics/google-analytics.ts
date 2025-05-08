import { AnalyticsAdminServiceClient } from '@google-analytics/admin'
import appRootPath from 'app-root-path'
import { executeGooglePromise } from './handle-google-error'

const fileName = process.env.GOOGLE_APPLICATION_CREDENTIALS_FILE as string
const GOOGLE_APPLICATION_CREDENTIALS_FILE = appRootPath.resolve(fileName)

// Authentication - create a service account key and download the JSON
// https://console.cloud.google.com/iam-admin/serviceaccounts
// Go to https://analytics.google.com
// https://console.cloud.google.com/apis/library
// https://console.cloud.google.com/apis/library/analytics.googleapis.com
// https://console.cloud.google.com/iam-admin/serviceaccounts/details/
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
export async function getProperties() {
  const client = await initializeGAAdmin()

  try {
    // List all Google Analytics properties
    const [properties] = await client.listProperties({})
    return properties
  } catch (error) {
    console.error('Error fetching GA properties:', error)
    throw error
  }
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

export async function generateNewToken() {
  const client = await initializeGAAdmin()
  console.debug('Generating new token for new token:')
  const result = await executeGooglePromise(client.listAccounts())
  if (result.isErr()) {
    console.error(
      'Error creating new token for new token:',
      result.error.message,
    )

    return
  }
  const [accounts] = result.value

  if (accounts?.length > 0) {
    console.debug('Found existing accounts:', accounts);
    // return accounts[0]; // Return the first available account
  }
}
