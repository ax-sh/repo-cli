// import { getMeasurementId } from './google-analytics'

// Get data streams for a specific property
import type { AnalyticsAdminServiceClient } from '@google-analytics/admin'
import { executeGooglePromise } from './track-google-analytics/handle-google-error'

export async function listAccountPropertiesWithAccountName(
  client: AnalyticsAdminServiceClient,
  // format => accounts/333
  accountName: string,
) {
  const result = await executeGooglePromise(
    client.listProperties({ filter: `parent:${accountName}` }),
  )
  if (result.isErr()) {
    throw result.error
  }
  return result.value
}

interface CreateDataStreamForSiteOptions {
  client: AnalyticsAdminServiceClient
  accountName: string
  displayName: string
  url: string
}

export async function createDataStreamForSite({
  client,
  url,
  accountName,
  displayName,
}: CreateDataStreamForSiteOptions) {
  // List data streams (web, iOS, Android)
  const result = await executeGooglePromise(
    client.createDataStream({
      parent: accountName,

      dataStream: {
        type: 'WEB_DATA_STREAM',
        displayName,
        webStreamData: { defaultUri: url },
      },
    }),
  )
  if (result.isErr()) {
    console.error('Error creating data streams:', result.error)
    console.error('Error creating data streams:', result.error.cause)
    throw result.error
  }

  const [dataStreams] = result.value
  return dataStreams
}

export async function getDataStreams(
  client: AnalyticsAdminServiceClient,
  propertyName: string,
) {
  // List data streams (web, iOS, Android)
  const result = await executeGooglePromise(
    client.listDataStreams({
      parent: propertyName,
    }),
  )
  if (result.isErr()) {
    console.error('Error fetching data streams:', result.error)
    throw result.error
  }

  const [dataStreams] = result.value
  return dataStreams
}

// Get measurement ID from a web data stream
export async function getMeasurementId(
  client: AnalyticsAdminServiceClient,
  propertyName: string,
) {
  const dataStreams = await getDataStreams(client, propertyName)

  // Find the web data stream
  const webStream = dataStreams.find(
    (stream) => stream.type === 'WEB_DATA_STREAM',
  )

  if (webStream) {
    return webStream.webStreamData?.measurementId
  } else {
    throw new Error('No web data stream found for this property')
  }
}

// http://analytics.google.com/
export async function run() {
  console.debug('todo doing')

  const out = 'out'
  return out
}
