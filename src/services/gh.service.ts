import { getJsonFromCmd } from '../lib/helpers/cmd/cli'

export async function listAllPublicRepos(
  lang?: string | 'python' | 'java' | 'go' | 'js',
) {
  let cmd = 'gh repo list --visibility public --json name'
  if (lang !== undefined) {
    cmd += ` --language ${lang}`
  }
  return getJsonFromCmd(cmd)
}
