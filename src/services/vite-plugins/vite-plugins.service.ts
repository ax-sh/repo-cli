import {
  addImportsToSourceFile,
  addPluginsInDefaultViteConfig,
} from '@ax-sh/ts-morph-kit'
import { exeCmdWithOutput } from '../../lib'
import { openViteConfigAsSourceFile } from '../gh-pages/gh-pages.service'

export async function addDefaultVitePlugins() {
  await exeCmdWithOutput('ni --save-dev vite-plugin-qrcode')
  const sourceFile = openViteConfigAsSourceFile()

  addImportsToSourceFile(sourceFile, [
    {
      imports: ['qrcode'],
      from: 'vite-plugin-qrcode',
    },
  ])
  addPluginsInDefaultViteConfig(sourceFile, ['qrcode()'])
  sourceFile.formatText()
  sourceFile.saveSync()

  const out = sourceFile.getText()
  return out
}
