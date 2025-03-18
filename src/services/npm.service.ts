import { print, system } from 'gluegun'
import { KnownError } from '../errors'

const auth = '--//npm.pkg.github.com/:_authToken="$(gh auth token)"'
export async function whoamiGithub() {
  return system.run(`npm whoami ${auth}`, { trim: true })
}

// "gh:pub": "NPM_CONFIG_REGISTRY=\"https://npm.pkg.github.com/\" npm publish --//npm.pkg.github.com/:_authToken=\"$(gh auth token)\"",

export async function publishToGithubPrivateRegistry() {
  // eslint-disable-next-line node/prefer-global/process
  process.env.NPM_CONFIG_REGISTRY = 'https://npm.pkg.github.com/'
  const user = await whoamiGithub()
  if (user !== 'ax-sh') {
    throw new KnownError([user, 'Not the right github account auth'])
  }
  const pub = await system.run(`npm publish ${auth}`, { trim: true })
  console.warn('Publishing to', user)
  print.highlight(pub)
}
