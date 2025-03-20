import { getJsonFromCmd, getTrimmedFromCmdOutput } from '../lib/helpers/cmd/cli';

export async function tagRepoAndRelease() {
  const cmd = `bun exec 'VERSION=$(git cliff --bumped-version) && git tag $VERSION && git push origin $VERSION && git cliff -l -s all | gh release create $VERSION --notes-file -'`
  const out = await getTrimmedFromCmdOutput(cmd)
  return out
}

type PublicReposLang = string | 'python' | 'java' | 'go' | 'js'
export async function listAllPublicRepos(lang?: PublicReposLang) {
  let cmd = 'gh repo list --visibility public --json name,visibility,updatedAt'
  if (lang !== undefined) {
    cmd += ` --language ${lang}`
  }
  return getJsonFromCmd(cmd)
}
