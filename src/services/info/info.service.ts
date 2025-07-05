import {
  getGithubPagesUrlForRepo,
  getGithubRepoInfo,
} from '../gh-pages/gh-pages.service'

export async function getInfo() {
  const json = await getGithubRepoInfo()
  if (json.nameWithOwner == null) {
    return console.error('No github nameWithOwner found.')
  }
  // @ts-expect-error fixme type later
  json.ghPagesUrl = await getGithubPagesUrlForRepo(json.nameWithOwner)

  console.debug(json)
}
