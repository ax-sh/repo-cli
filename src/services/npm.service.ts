import { print, system } from 'gluegun'
import { KnownError } from '../errors'

const auth = '--//npm.pkg.github.com/:_authToken="$(gh auth token)"'
export async function whoamiGithub() {
  const { $, ExecaError } = await import('execa');
  try {
    return await $`npm whoami ${auth}`
  }
  catch (error) {
    if (error instanceof ExecaError) {
      print.error(error.message)
      print.info(`${error.shortMessage} ${error.durationMs}`)
      print.highlight(error.escapedCommand);
      return error.failed
    }
  }
}

// "gh:pub": "NPM_CONFIG_REGISTRY=\"https://npm.pkg.github.com/\" npm publish --//npm.pkg.github.com/:_authToken=\"$(gh auth token)\"",
// "pub": "nr prepublishOnly && npm publish --scope=@ax-sh --registry=https://npm.pkg.github.com",
// ^ this does not work as expected as above
export async function publishToGithubPrivateRegistry() {
  // eslint-disable-next-line node/prefer-global/process
  process.env.NPM_CONFIG_REGISTRY = 'https://npm.pkg.github.com/'
  const user = await whoamiGithub()
  if (user && user !== 'ax-sh') {
    throw new KnownError([user, 'Not the right github account auth'])
  }
  const pub = await system.run(`npm publish ${auth}`, { trim: true })
  console.warn('Publishing to', user)
  print.highlight(pub)
}
