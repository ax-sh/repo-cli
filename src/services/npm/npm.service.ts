import { print } from 'gluegun';
import { KnownError } from '../../errors'
import { exeCmdWithOutput } from '../../lib';

// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm publish --//npm.pkg.github.com/:_authToken="$(gh auth token)"
// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm whoami --//npm.pkg.github.com/:_authToken="$(gh auth token)"
// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm login --//npm.pkg.github.com/:_authToken="$(gh auth token)"
// NPM_CONFIG_REGISTRY="https://npm.pkg.github.com/" npm adduser --//npm.pkg.github.com/:_authToken="$(gh auth token)"

async function checkGithubAuthStatus() {
  try {
    await exeCmdWithOutput(`gh auth status`)
    // Token scopes: 'admin:public_key', 'copilot', 'delete:packages', 'read:org', 'repo', 'write:packages'
    return true
  }
  catch (e) {
    // print.error(new KnownError(['Invalid GITHUB token', e.cmd, e.stderr]));
    return false
  }
}
async function exeCmdWithOutputWithGithubNpmAuth(cmd: string) {
  const auth = '--//npm.pkg.github.com/:_authToken="$(gh auth token)"'
  // eslint-disable-next-line node/prefer-global/process
  process.env.NPM_CONFIG_REGISTRY = 'https://npm.pkg.github.com/'
  try {
    return await exeCmdWithOutput(`${cmd} ${auth}`)
  }
  catch (e) {
    print.error(e.stderr);
    print.highlight(e.cmd)
    throw new KnownError(e)
  }
}

export async function whoamiGithub() {
  if (!await checkGithubAuthStatus()) {
    print.highlight('gh auth status')
    throw new KnownError('gh Auth Token is invalid')
  }

  const who = await exeCmdWithOutputWithGithubNpmAuth('npm whoami')
  return who
}

// "gh:pub": "NPM_CONFIG_REGISTRY=\"https://npm.pkg.github.com/\" npm publish --//npm.pkg.github.com/:_authToken=\"$(gh auth token)\"",
// "pub": "nr prepublishOnly && npm publish --scope=@ax-sh --registry=https://npm.pkg.github.com",
// ^ this does not work as expected as above
export async function publishToGithubPrivateRegistry() {
  const user = await whoamiGithub()
  if (user !== 'ax-sh') {
    throw new KnownError([user, 'Not the right github account auth'])
  }
  const pub = await exeCmdWithOutputWithGithubNpmAuth(`npm publish`)
  console.warn('Publishing to', user)
  print.highlight(pub)
}
