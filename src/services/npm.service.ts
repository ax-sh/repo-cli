import { print } from 'gluegun'
import { KnownError } from '../errors'
import { exeCmdWithOutput } from '../lib';

// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm publish --//npm.pkg.github.com/:_authToken="$(gh auth token)"
// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm whoami --//npm.pkg.github.com/:_authToken="$(gh auth token)"
// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm login --//npm.pkg.github.com/:_authToken="$(gh auth token)"
// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm adduser --//npm.pkg.github.com/:_authToken="$(gh auth token)"

const auth = '--//npm.pkg.github.com/:_authToken="$(gh auth token)"'
export async function whoamiGithub() {
  const { $ } = await import('execa')

  // eslint-disable-next-line node/prefer-global/process
  process.env.NPM_CONFIG_REGISTRY = 'https://npm.pkg.github.com/'
  try {
    const { stdout: auth } = await $`gh auth token`
    const who = await exeCmdWithOutput(`npm whoami --//npm.pkg.github.com/:_authToken="${auth}"`)
    return who
  }
  catch (e) {
    print.error(e.stderr);
    print.highlight(e.cmd)
    return ''
    // throw new KnownError(e)
  }
}

// "gh:pub": "NPM_CONFIG_REGISTRY=\"https://npm.pkg.github.com/\" npm publish --//npm.pkg.github.com/:_authToken=\"$(gh auth token)\"",
// "pub": "nr prepublishOnly && npm publish --scope=@ax-sh --registry=https://npm.pkg.github.com",
// ^ this does not work as expected as above
export async function publishToGithubPrivateRegistry() {
  // eslint-disable-next-line node/prefer-global/process
  process.env.NPM_CONFIG_REGISTRY = 'https://npm.pkg.github.com/'
  const user = await whoamiGithub()
  if (user !== 'ax-sh') {
    throw new KnownError([user, 'Not the right github account auth'])
  }
  const pub = await exeCmdWithOutput(`npm publish ${auth}`)
  console.warn('Publishing to', user)
  print.highlight(pub)
}
