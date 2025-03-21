import { system } from 'gluegun'
import { exeCmdWithOutput } from '../../lib/helpers/cmd/cli';

export async function gitCliffBumpedVersion() {
  const nextVersion = await exeCmdWithOutput('git cliff --bumped-version')
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
