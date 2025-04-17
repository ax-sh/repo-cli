import { addPluginsInDefaultViteConfig } from '@ax-sh/ts-morph-kit'
import { openViteConfigAsSourceFile } from '../gh-pages/gh-pages.service'

export async function addTailwindToProject() {
  const sourceFile = openViteConfigAsSourceFile()
  addPluginsInDefaultViteConfig(sourceFile, ['tailwindcss()'])
  // addImportsToTsFile(sourceFile, "")
  sourceFile.formatText()
  sourceFile.saveSync()

  return 'done'
}
