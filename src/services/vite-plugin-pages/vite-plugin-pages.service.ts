import { addImportsToSourceFile, addPluginsInDefaultViteConfig } from '@ax-sh/ts-morph-kit'
import { print } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'
import { openViteConfigAsSourceFile } from '../gh-pages/gh-pages.service'

export async function addVitePluginPages() {
  await exeCmdWithOutput('ni -D vite-plugin-pages')
  await exeCmdWithOutput('ni react-router react-router-dom')
  const sourceFile = openViteConfigAsSourceFile()
  addImportsToSourceFile(sourceFile, [{ imports: 'Pages', from: 'vite-plugin-pages' }])
  addPluginsInDefaultViteConfig(sourceFile, ['Pages()'])
  sourceFile.formatText()
  sourceFile.saveSync()

  print.info('ref: https://www.npmjs.com/package/vite-plugin-pages')
  const out = 'out'
  return out
}
