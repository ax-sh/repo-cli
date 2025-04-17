import { addImportsToSourceFile, addPluginsInDefaultViteConfig } from '@ax-sh/ts-morph-kit'
import { openViteConfigAsSourceFile } from '../gh-pages/gh-pages.service'

export async function addTailwindToProject() {
  const sourceFile = openViteConfigAsSourceFile()

  addImportsToSourceFile(sourceFile, [
    {
      imports: 'tailwindcss',
      from: '@tailwindcss/vite',
    },
  ])
  addPluginsInDefaultViteConfig(sourceFile, ['tailwindcss()'])
  sourceFile.formatText()
  sourceFile.saveSync()

  return 'Add @import "tailwindcss"; to your main css file'
}
