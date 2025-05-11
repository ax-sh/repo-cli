import { AnalyticsAdminServiceClient, protos } from '@google-analytics/admin'
import appRootPath from 'app-root-path'

import z from 'zod'
import { createDataStreamForSite } from '../analytics.service'
import {
  createOrMakeNewMainAccount,
  findOrCreateAccount,
} from './find-ga-account-id'
import { executeGooglePromise } from './handle-google-error'
// google types
import IAccount = protos.google.analytics.admin.v1alpha.IAccount
import ICreatePropertyRequest = protos.google.analytics.admin.v1alpha.ICreatePropertyRequest
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

function parseGoogleAdminAccountId(account: IAccount): number {
  const name = account?.name as string
  return Number(name.split('/')[1])
}

async function createPropertyWithDisplayName(
  client: AnalyticsAdminServiceClient,
  accountName: string,
  displayName: string,
) {
  const createPropertyRequest: ICreatePropertyRequest = {
    property: {
      parent: accountName,
      displayName,
      industryCategory: 'TECHNOLOGY',
      timeZone: 'America/Los_Angeles',
      currencyCode: 'USD',
    },
  }
  const result = await executeGooglePromise(
    client.createProperty(createPropertyRequest),
  )
  if (result.isErr()) {
    throw result.error
  }
  return result.value
}

export async function listParentAccountProperties(
  client: AnalyticsAdminServiceClient,
  accountName: string,
) {
  const result = await executeGooglePromise(
    client.listProperties({
      filter: `parent:${accountName}`,
    }),
  )
  if (result.isErr()) {
    throw result.error
  }
  return result.value
}

const validateName = z.string()

async function findMainAccount(client: AnalyticsAdminServiceClient) {
  const account = await createOrMakeNewMainAccount(client)

  return validateName.parse(account.name)
}

// Define the schema for a property
const propertySchema = z.object({
  displayName: z.string(),
  // Add other properties as needed
})

// Define the schema for the input that includes an array of properties
const inputSchema = z
  .object({
    properties: z.array(propertySchema),
    displayName: z.string(),
  })
  .refine(
    (data) => {
      if (data.properties.length > 0) {
        const propertyNameToCheck = data.displayName
        const propertyExists = data.properties.some(
          prop => prop.displayName === propertyNameToCheck,
        )

        if (propertyExists) {
          return false
          //   throw new Error(`Property Exists [${propertyNameToCheck}] aborting to not create duplicate property.`);
        }
      }
      return true
    },
    {
      message: 'Validation failed: duplicate property',
    },
  )

export async function generateNewToken(displayName: string, url: string) {
  console.debug(
    `Generating new tracking token property for ${displayName} with => ${url}`,
  )
  const client = await initializeGAAdmin()
  const mainAccountName = await findMainAccount(client)

  console.info(`Creating new tracking token property for ${mainAccountName}`)
  // 1. List existing properties under the account
  const [properties] = await listParentAccountProperties(
    client,
    mainAccountName,
  )
  console.info(`Validating new property for ${mainAccountName}`)
  // throw error if validation failed
  inputSchema.parse({
    properties,
    displayName,
  })

  const [property] = await createPropertyWithDisplayName(
    client,
    mainAccountName,
    displayName,
  )
  // const accountId = parseGoogleAdminAccountId(account)

  // accountId should match property.parent

  const accountName = validateName.parse(property.name)
  const dataStream = await createDataStreamForSite({
    client,
    accountName,
    displayName,
    url,
  })

  return { property, dataStream }
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
  console.info('using account', account)

  const properties = await getProperties(client, accountId)
  return properties
}
