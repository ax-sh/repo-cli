import { system } from 'gluegun'

export async function gitCliffBumpedVersion() {
  const nextVersion = await system.run('git cliff --bumped-version', { trim: true })
  return nextVersion
}

export async function getRepoUrl() {
  return system.run('git remote get-url origin', { trim: true })
}

export async function gitFlowInit() {
  return system.run('git flow init -d && git add . && git commit -m init', {
    trim: true,
  })
}
