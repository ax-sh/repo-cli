import type {
  SourceFile,
} from '@ax-sh/ts-morph-kit';
import {
  addBasePropertyInDefaultViteConfig,
  openAsSourceFile,
} from '@ax-sh/ts-morph-kit';
import { filesystem, print } from 'gluegun';
import { KnownError } from '../../errors'
import { exeCmdWithOutput } from '../../lib';
import { getRepoBaseName } from '../git/git.service';

const viteConfigPath = 'vite.config.ts'

async function addGithubPagesBase(sourceFile: SourceFile) {
  const value = await getRepoBaseName()
  print.info(`https://ax-sh.github.io/${value}/`)
  const base = `/${value}/`

  const config = addBasePropertyInDefaultViteConfig(sourceFile, base)
  return config
}

export async function configViteConfigForGhPages() {
  const sourceFile = openAsSourceFile(viteConfigPath)
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
