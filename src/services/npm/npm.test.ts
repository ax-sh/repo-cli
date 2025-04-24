import { expect } from 'vitest'

async function whoamiInGithub() {
  const { $, ExecaError } = await import('execa')
  try {
    const token = await $`gh auth token`
    const auth = `--//npm.pkg.github.com/:_authToken="${token.stdout}"`
    const { stdout } = await $`npm whoami ${auth}`
    return stdout
  }
  catch (error) {
    if (!(error instanceof ExecaError)) {
      return
    }
    console.error('error running command:', error.command)
  }
}

describe('npm cmd test', () => {
  // currently fails because the implementation cant
  // npm error code ENEEDAUTH
  // npm error need auth This command requires you to be logged in.
  // npm error need auth You need to authorize this machine using `npm adduser`
  it.todo('should get whoami', async () => {
    const who = await whoamiInGithub()
    expect(who).toEqual('me')
  })
})
