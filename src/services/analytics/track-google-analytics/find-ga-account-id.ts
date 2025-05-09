import type { AnalyticsAdminServiceClient } from '@google-analytics/admin'
// import { protos } from '@google-analytics/admin'
import { initializeGAAdmin } from './google-analytics'
import { executeGooglePromise } from './handle-google-error'
// import IListPropertiesRequest = protos.google.analytics.admin.v1alpha.IListPropertiesRequest

// needed For using listAccounts for service client_email accounts
// Go to https://analytics.google.com
// NOTE ADDING THE SERVICE ACCOUNT TO GA4 PROPERTY
// Navigate to the target GA4 property
//
// Click Admin > Property Settings > Property Access Management
//
// Add your service account client email analyticsadminclient<name>.iam.gserviceaccount.com from the json to  // Property access management
// Assign the Editor role or full control
/**
 * List all available Google Analytics accounts
 * This will display the account IDs you need
 */
// List all available accounts
export async function listAccounts() {
  const client = await initializeGAAdmin()

  try {
    const [accounts] = await client.listAccounts()
    return accounts
  } catch (error) {
    console.dir(error)
    throw error
  }
}

export async function getAccount(accountId: number) {
  const client = await initializeGAAdmin()

  try {
    const [account] = await client.getAccount({
      name: `accounts/${accountId}`,
    })

    return account
  } catch (error) {
    console.error(`Error getting account ${accountId}:`, error)
    throw error
  }
}

/**
 * Find or create a Google Analytics account
 * This will create a new account if none exists
 */
export async function findOrCreateAccount(client: AnalyticsAdminServiceClient) {
  const result = await executeGooglePromise(client.listAccounts())

  if (result.isErr()) {
    console.error(
      'Error creating new token for new token:',
      result.error.message,
    )

    console.error('Error listing accounts:', result.error.cause)
    return
  }
  const [accounts] = result.value
  if (accounts.length === 1) {
    return accounts[0] // Return the first available account
  }
  if (accounts.length > 1) {
    console.debug('Found multiple existing accounts:', accounts)
  }
  throw new Error('Not implemented TODO Creating new account for new token:')
  // const displayName = 'My Analytics Account'
  // const regionCode = 'US'
  // console.debug('No accounts found. Creating a new account...')
  // console.warn(
  //   'TODO Creating new token for new token:',
  //   accounts,
  //   displayName,
  //   regionCode,
  // )
}

export async function createOrMakeNewMainAccount(
  client: AnalyticsAdminServiceClient,
) {
  const result = await executeGooglePromise(findOrCreateAccount(client))
  if (result.isErr()) {
    throw result.error
  }
  const account = result.value!
  return account
}
