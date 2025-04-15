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
