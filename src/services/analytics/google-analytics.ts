import type { GoogleError } from 'google-gax'
import { AnalyticsAdminServiceClient } from '@google-analytics/admin'
import appRootPath from 'app-root-path'
import { Status } from 'google-gax'

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
async function getProperties() {
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

// // Initialize ReactGA4 with the measurement ID
// async function initializeReactGA(propertyName) {
//   try {
//     // Initialize GA4
//     ReactGA4.initialize(measurementId);
//     console.log('ReactGA4 initialized with measurement ID:', measurementId);
//
//     return measurementId;
//   } catch (error) {
//     console.error('Error initializing ReactGA4:', error);
//     throw error;
//   }
// }

export function handleAnalyticsError(error: GoogleError) {
  if (error.code === undefined)
    throw new Error('Unknown Error:', error)
  // if (error instanceof Error) {
  //  console.error('Generic Error:', error.message);
  //  if (error.code) {
  //    console.error(`API Error [${error.code}]:`, error.message);
  //  } else {
  //
  //  }

  // Optional: Custom response
  switch (error.code) {
    case 7: // PERMISSION_DENIED
      console.error(
        '🔒 Permission denied. Check your service account or OAuth token.',
      )
      break
    case 3: // INVALID_ARGUMENT
      console.error('⚠️ Invalid request. Check input parameters.')
      break
    case 5: // NOT_FOUND
      console.error('📭 Resource not found.')
      break
    case 14: // UNAVAILABLE
      console.error('🌐 Network/server issue. Retry might help.')
      break
    case Status.OK: {
      throw new Error('Not implemented yet: Status.OK case')
    }
    case Status.CANCELLED: {
      throw new Error('Not implemented yet: Status.CANCELLED case')
    }
    case Status.UNKNOWN: {
      throw new Error('Not implemented yet: Status.UNKNOWN case')
    }
    case Status.INVALID_ARGUMENT: {
      throw new Error('Not implemented yet: Status.INVALID_ARGUMENT case')
    }
    case Status.DEADLINE_EXCEEDED: {
      throw new Error('Not implemented yet: Status.DEADLINE_EXCEEDED case')
    }
    case Status.NOT_FOUND: {
      throw new Error('Not implemented yet: Status.NOT_FOUND case')
    }
    case Status.ALREADY_EXISTS: {
      throw new Error('Not implemented yet: Status.ALREADY_EXISTS case')
    }
    case Status.PERMISSION_DENIED: {
      throw new Error('Not implemented yet: Status.PERMISSION_DENIED case')
    }
    case Status.RESOURCE_EXHAUSTED: {
      throw new Error('Not implemented yet: Status.RESOURCE_EXHAUSTED case')
    }
    case Status.FAILED_PRECONDITION: {
      throw new Error('Not implemented yet: Status.FAILED_PRECONDITION case')
    }
    case Status.ABORTED: {
      throw new Error('Not implemented yet: Status.ABORTED case')
    }
    case Status.OUT_OF_RANGE: {
      throw new Error('Not implemented yet: Status.OUT_OF_RANGE case')
    }
    case Status.UNIMPLEMENTED: {
      throw new Error('Not implemented yet: Status.UNIMPLEMENTED case')
    }
    case Status.INTERNAL: {
      throw new Error('Not implemented yet: Status.INTERNAL case')
    }
    case Status.UNAVAILABLE: {
      throw new Error('Not implemented yet: Status.UNAVAILABLE case')
    }
    case Status.DATA_LOSS: {
      throw new Error('Not implemented yet: Status.DATA_LOSS case')
    }
    case Status.UNAUTHENTICATED: {
      throw new Error('Not implemented yet: Status.UNAUTHENTICATED case')
    }
    default:
      console.error('🧨 Unexpected error:', error)
  }
}
