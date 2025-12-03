import type { AnalyticsAdminServiceClient } from '@google-analytics/admin'
import { exeCmdWithOutput } from '../../lib'
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
export async function addAnalyticsDeps() {
  console.debug('todo doing')

  const cmd = 'ni --save-dev vite-plugin-radar'
  // // vite.config.js
  // import { VitePluginRadar } from 'vite-plugin-radar'
  //
  // export default {
  //   plugins: [
  //     VitePluginRadar({
  //       // Google Analytics tag injection
  //       analytics: {
  //         id: 'G-XXXXX',
  //       },
  //     })
  //   ],
  // }
  // // Google Analytics (multiple tag can be set with an array)
  //       analytics: [
  //         {
  //           /**
  //            * Measurement id
  //            */
  //           id: 'G-XXXXX',
  //
  //           /**
  //            * disable tracking for this measurement
  //            *   window['ga-disable-MEASUREMENT_ID'] = true
  //            * @see https://developers.google.com/analytics/devguides/collection/ga4/disable-analytics
  //            */
  //           disable: true,
  //
  //           /**
  //            * You can configure all settings provided by analytics here
  //            * @see https://developers.google.com/analytics/devguides/collection/ga4/cookies-user-id
  //            * @see https://developers.google.com/analytics/devguides/collection/ga4/disable-page-view
  //            * @see https://developers.google.com/analytics/devguides/collection/ga4/display-features
  //            */
  //           config: {
  //             cookie_domain: 'auto',
  //             cookie_expires: 63072000,
  //             cookie_prefix: 'none',
  //             cookie_update: true,
  //             cookie_flags: '',
  //             send_page_view: true,
  //             allow_google_signals: true,
  //             allow_ad_personalization_signals: true,
  //           },
  //
  //           /**
  //            * Set default values for "consent mode"
  //            * @see https://developers.google.com/tag-platform/devguides/consent
  //            * @see https://support.google.com/analytics/answer/9976101
  //            */
  //           consentDefaults: {
  //             analytics_storage: 'granted',
  //             ad_storage: 'denied',
  //             wait_for_update: 500
  //           },
  //
  //           /**
  //            * You set persitent values
  //            * @see https://developers.google.com/analytics/devguides/collection/ga4/persistent-values
  //            */
  //           persistentValues: {
  //             currency: 'USD',
  //           }
  //         },
  //         // You can add as many measurement id as you need
  //         {
  //           id: 'UA-YYYYY',
  //         },
  //       ],
  //
  //       // Google Tag Manager (multiple tag can be set with an array)
  //       gtm: [
  //         {
  //           id: 'GTM-XXXXX',
  //
  //           // You can set custom source for gtm script and noscript
  //           gtmBase: 'https://www.custom.com/gtm.js',
  //           nsBase: 'https://www.custom.com/ns.html',
  //           // You can optionally define the environment for the gtm.
  //           environment: {
  //             auth: 'X1YzAB2CDEFGh3ijklmnoP',
  //             preview: 'env-x',
  //           },
  //         }
  //       ],

  const out = exeCmdWithOutput(cmd)
  // // import { getMeasurementId } from './google-analytics'
  // // Get data streams for a specific property

  return out
}
