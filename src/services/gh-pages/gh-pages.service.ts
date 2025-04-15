import {
  addBasePropertyInDefaultViteConfig,
  objectLiteralExpressionToJson,
  openAsSourceFile,
} from '@ax-sh/ts-morph-kit';
import { filesystem, print } from 'gluegun';
import { KnownError } from '../../errors'
import { exeCmdWithOutput } from '../../lib';

const viteConfigPath = 'vite.config.ts'
export async function configViteConfigForGhPages() {
  const sourceFile = openAsSourceFile(viteConfigPath)
  // todo get base name from git
  const base = 'fooddoo'
  const config = addBasePropertyInDefaultViteConfig(sourceFile, base)

  sourceFile.formatText()
  // eslint-disable-next-line ts/no-unsafe-call
  const json = objectLiteralExpressionToJson(config)
  console.log(json);
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
