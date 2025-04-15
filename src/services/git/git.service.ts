import path from 'node:path';
import { exeCmdWithOutput } from '../../lib'

export async function gitCliffBumpedVersion() {
  const nextVersion = await exeCmdWithOutput('git cliff --bumped-version')
  return nextVersion
}

export async function getRepoUrl() {
  return exeCmdWithOutput('git remote get-url origin')
}

export async function gitFlowInit() {
  return exeCmdWithOutput('git flow init -d && git add . && git commit -m init')
}

export async function getRepoBaseName() {
  const url = await getRepoUrl()
  const parsed = path.parse(url)
  /**
   * {
   *   root: '',
   *   dir: 'https://github.com/ax-sh',
   *   base: 'fii',
   *   ext: '',
   *   name: 'fii',
   * }
   */
  const repoName = parsed.name.trim()

  return repoName
}
