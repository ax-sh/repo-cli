import { protos } from '@google-analytics/admin'
import { initializeGAAdmin } from './google-analytics'
import IListPropertiesRequest = protos.google.analytics.admin.v1alpha.IListPropertiesRequest

/**
 * List all available Google Analytics accounts
 * This will display the account IDs you need
 */
// List all available accounts
export async function listAccounts() {
  // NOTE ADDING THE SERVICE ACCOUNT TO GA4 PROPERTY

  //
  // Navigate to the target GA4 property
  //
  // Click Admin > Property Settings > Property Access Management
  //
  // Add your service account client email analyticsadminclient<name>.iam.gserviceaccount.com from the json to  // Property access management
  // Assign the Editor role or full control
  const client = await initializeGAAdmin()

  try {
    const [accounts] = await client.listAccounts()
    return accounts
  } catch (error) {
    console.error('Error listing accounts:', error)
    console.dir(error)
    throw error
  }
}

export async function getAccount(accountId: number) {
  const client = await initializeGAAdmin();

  try {
    const [account] = await client.getAccount({
      name: `accounts/${accountId}`,
    });

    return account
  } catch (error) {
    console.error(`Error getting account ${accountId}:`, error);
    throw error;
  }
}

/**
 * Find or create a Google Analytics account
 * This will create a new account if none exists
 */
export async function findOrCreateAccount(displayName = 'My Analytics Account', regionCode = 'US') {
  try {
    // First try to list existing accounts
    const accounts = await listAccounts();

    if (accounts?.length > 0) {
      console.debug('Found existing accounts:', accounts);
      return accounts[0]; // Return the first available account
    }

    // If no accounts exist, create a new one
    console.debug('No accounts found. Creating a new account...');
    // return await createAccount(displayName, regionCode);
  } catch (error) {
    console.error('Error finding or creating account:', error);
    throw error;
  }
}
