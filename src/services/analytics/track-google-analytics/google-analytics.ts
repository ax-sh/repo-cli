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

function checkIfAccountNameExists(mainAccountName) {
  if (mainAccountName === null || mainAccountName === undefined) {
    throw new Error('No main account name provided')
  }
}

const validateName = z.string()

export async function generateNewToken(displayName: string, url: string) {
  console.debug('Generating new token for new token:')
  const client = await initializeGAAdmin()
  const account = await createOrMakeNewMainAccount(client)
  const accountId = parseGoogleAdminAccountId(account)
  const mainAccountName = validateName.parse(account.name)

  checkIfAccountNameExists(mainAccountName)

  // 1. List existing properties under the account
  const [properties] = await listParentAccountProperties(
    client,
    mainAccountName,
  )
  if (properties.length > 0) {
    // console.log(properties)
    // 2. Check if a property with the same display name already exists
    const propertyNameToCheck = displayName
    const propertyExists = properties.some(
      prop => prop.displayName === propertyNameToCheck,
    )
    if (propertyExists) {
      throw new Error(`not creating new [${displayName}] as propertyExists`)
    }
  }

  const [property] = await createPropertyWithDisplayName(
    client,
    mainAccountName,
    displayName,
  )

  console.info(`Creating new token for ${accountId}`)

  console.info(`Property: `, property)
  console.info(accountId)
  console.info(account)
  const accountName = validateName.parse(property.name)
  const dataStream = await createDataStreamForSite({
    client,
    accountName,
    displayName,
    url,
  })

  return dataStream
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
