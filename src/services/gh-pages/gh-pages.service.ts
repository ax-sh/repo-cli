import type {
  SourceFile,
} from '@ax-sh/ts-morph-kit';
import type { MappedString } from '../../types';
import {
  addBasePropertyInDefaultViteConfig,
  openAsSourceFile,
} from '@ax-sh/ts-morph-kit';
import { filesystem, print } from 'gluegun';
import { KnownError } from '../../errors'
import { exeCmdWithOutput } from '../../lib';
import { getJsonFromCmd } from '../../lib/helpers/cmd/cli';
import { getRepoBaseName } from '../git/git.service';

const viteConfigPath = 'vite.config.ts'

export function openViteConfigAsSourceFile() {
  const sourceFile = openAsSourceFile(viteConfigPath)
  return sourceFile
}

async function addGithubPagesBase(sourceFile: SourceFile) {
  const value = await getRepoBaseName()

  const base = `/${value}/`

  const config = addBasePropertyInDefaultViteConfig(sourceFile, base)
  return config
}

export async function configViteConfigForGhPages() {
  const sourceFile = openViteConfigAsSourceFile()
  const config = await addGithubPagesBase(sourceFile)

  sourceFile.formatText()
  sourceFile.saveSync()

  return config
}

export async function addDependencies() {
  if (filesystem.isNotFile(viteConfigPath)) {
    throw new KnownError('🚨Not a vite project vite.config.ts not found!')
  }
  return exeCmdWithOutput('ni -D rimraf gh-pages')
}

export async function checkIfPushedToRemote() {
  try {
    const checkIfPushedToRemote = await exeCmdWithOutput('git ls-remote')
    print.highlight({ checkIfPushedToRemote })
  }
  catch (e) {
    throw new KnownError([
      'Repo doesnt have associated github repo online',
      // eslint-disable-next-line ts/no-unsafe-member-access
      e.stderr,
    ])
  }
}

export async function getGithubRepoInfo() {
  const props = [
    'id',
    'url',
    'name',
    'createdAt',
    'description',
    'homepageUrl',
    'nameWithOwner',
    'pushedAt',
    'sshUrl',
    'visibility',
    'watchers',
    'diskUsage',
    'createdAt',
    'updatedAt',
  ] as const
  const cmd = `gh repo view --json ${props.join(',')}`
  return getJsonFromCmd<MappedString<(typeof props)[number]>>(cmd)
}

export async function getGithubPagesUrlForRepo() {
  const username = 'ax-sh'
  const repoName = await exeCmdWithOutput(`gh repo view --json name -q '.name'`)
  const homepage = `https://${username}.github.io/${repoName}`
  return homepage
}

export async function setHomepageUrlOnGithubRepoDescription(repoPath: string, homepage: string) {
  // const repoPath = await exeCmdWithOutput(`gh repo view --json url --jq '.url'`)
  // const homepage = await getGithubPagesUrlForRepo()

  const out = await exeCmdWithOutput(`gh repo edit ${repoPath} --homepage ${homepage}`)
  return out
}
