import { print, system } from 'gluegun'
import { KnownError } from '../errors'

export async function checkIfPushedToRemote() {
  try {
    const checkIfPushedToRemote = await system.run('git ls-remote', {
      trim: true,
    })
    print.highlight({ checkIfPushedToRemote })
  }
  catch (e) {
    throw new KnownError([
      'Repo doesnt have associated github repo online',
      e.stderr,
    ])
  }
}
