import { getGithubRepoInfo } from '../gh-pages/gh-pages.service'

export async function getInfo() {
  const json = await getGithubRepoInfo()

  console.debug(json)
}
