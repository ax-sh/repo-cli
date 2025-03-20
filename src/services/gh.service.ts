import { getJsonFromCmd } from '../lib/helpers/cmd/cli'

type PublicReposLang = string | 'python' | 'java' | 'go' | 'js'
export async function listAllPublicRepos(
  lang?: PublicReposLang,
) {
  let cmd = 'gh repo list --visibility public --json name,visibility,updatedAt'
  if (lang !== undefined) {
    cmd += ` --language ${lang}`
  }
  return getJsonFromCmd(cmd)
}
