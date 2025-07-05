import type { SourceFile } from '@ax-sh/ts-morph-kit'
import type { MappedString } from '../../types'
import {
  addBasePropertyInDefaultViteConfig,
  openAsSourceFile,
} from '@ax-sh/ts-morph-kit'
import { filesystem, print } from 'gluegun'
import { z } from 'zod'
import { KnownError } from '../../errors'
import { exeCmdWithOutput } from '../../lib'
import { getJsonFromCmd } from '../../lib/helpers/cmd/cli'
import { getRepoBaseName } from '../git/git.service'

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

export async function addGithubPagesDependencies() {
  if (filesystem.isNotFile(viteConfigPath)) {
    throw new KnownError('🚨Not a vite project vite.config.ts not found!')
  }
  return exeCmdWithOutput('ni -D rimraf gh-pages')
}

export async function checkIfPushedToRemote() {
  try {
    const checkIfPushedToRemote = await exeCmdWithOutput('git ls-remote')
    print.highlight({ checkIfPushedToRemote })
  } catch (e) {
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
  type GithubRepoInfo = MappedString<(typeof props)[number]>
  return await getJsonFromCmd<Partial<GithubRepoInfo>>(cmd) ?? {}
}

export async function getGithubPagesUrlForRepo(nameWithOwner: string) {
  const homepage = z
    .string()
    .transform((repoWithUsername) => {
      const [username, repoName] = repoWithUsername.split('/')
      // gh api /repos/ax-sh/ax-sh.github.io/pages
      if (!username) {
        throw new KnownError('username cant be empty')
      }
      if (!repoName) {
        throw new KnownError('repo name cant be empty')
      }

      return `https://${username}.github.io/${repoName}`
    })
    .parse(nameWithOwner)

  return homepage
}

export async function setHomepageUrlOnGithubRepoDescription(
  nameWithOwner: string,
  homepage: string,
) {
  if (!homepage) {
    throw new KnownError('homepage not defined')
  }

  const out = await exeCmdWithOutput(
    `gh repo edit ${nameWithOwner} --homepage ${homepage}`,
  )

  return out
}
export async function setHomepageToGithubPages(nameWithOwner: string) {
  const homepageUrl = await getGithubPagesUrlForRepo(nameWithOwner)
  const out = await setHomepageUrlOnGithubRepoDescription(
    nameWithOwner,
    homepageUrl,
  )
  print.info(`set homepage in repo description to ${homepageUrl} `)
  print.highlight(out)
}
