import { getJsonFromCmd } from '../lib/helpers/cmd/cli'

export async function tagRepoAndRelease() {
  console.warn('todo add tag that works cross platform')
}

type PublicReposLang = string | 'python' | 'java' | 'go' | 'js'
export async function listAllPublicRepos(lang?: PublicReposLang) {
  let cmd = 'gh repo list --visibility public --json name,visibility,updatedAt'
  if (lang !== undefined) {
    cmd += ` --language ${lang}`
  }
  return getJsonFromCmd(cmd)
}
