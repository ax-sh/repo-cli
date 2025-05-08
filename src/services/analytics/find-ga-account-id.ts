import { initializeGAAdmin } from './google-analytics'
/**
 * List all available Google Analytics accounts
 * This will display the account IDs you need
 */
// List all available accounts
async function listAccounts() {
  // NOTE ADDING THE SERVICE ACCOUNT TO GA4 PROPERTY
  // Go to https://analytics.google.com
  //
  // Navigate to the target GA4 property
  //
  // Click Admin > Property Settings > Property Access Management
  //
  // Add your service account client email analyticsadminclient<name>.iam.gserviceaccount.com from the json to  // Property access management
  // Assign the Editor role or full control
  const client = await initializeGAAdmin();

  try {
    const [accounts] = await client.listAccounts();
    return accounts;
  } catch (error) {
    console.error('Error listing accounts:', error);
    throw error;
  }
}

//
// /**
//  * DOES NOT WORK Create a new Google Analytics account if you don't have one
//  */
// async function createAccount(displayName, regionCode = 'US') {
//   const client = await initializeGAAdmin();
//
//   try {
//     const [account] = await client.createAccount({
//       account: {
//         displayName,
//         regionCode,
//       },
//     });
//
//     console.log('Created new account:', account);
//
//     return {
//       name: account.name,
//       displayName: account.displayName,
//       accountId: account.name.split('/')[1],
//       createTime: account.createTime,
//       regionCode: account.regionCode,
//     };
//   } catch (error) {
//     console.error('Error creating account:', error);
//     throw error;
//   }
// }

/**
 * Get an existing account by ID
 */
async function getAccount(accountId) {
  const client = await initializeGAAdmin();

  try {
    const [account] = await client.getAccount({
      name: `accounts/${accountId}`,
    });

    return {
      name: account.name,
      displayName: account.displayName,
      accountId: account.name.split('/')[1],
      createTime: account.createTime,
      regionCode: account.regionCode,
    };
  } catch (error) {
    console.error(`Error getting account ${accountId}:`, error);
    throw error;
  }
}

// /**
//  * Find or create a Google Analytics account
//  * This will create a new account if none exists
//  */
// async function findOrCreateAccount(displayName = 'My Analytics Account', regionCode = 'US') {
//   try {
//     // First try to list existing accounts
//     const accounts = await listAccounts();
//
//     if (accounts && accounts.length > 0) {
//       console.log('Found existing accounts:', accounts);
//       return accounts[0]; // Return the first available account
//     }
//
//     // If no accounts exist, create a new one
//     console.log('No accounts found. Creating a new account...');
//     return await createAccount(displayName, regionCode);
//   } catch (error) {
//     console.error('Error finding or creating account:', error);
//     throw error;
//   }
// }

export {
  // createAccount,
  findOrCreateAccount,
  getAccount,
  initializeGAAdmin,
  listAccounts,
};
