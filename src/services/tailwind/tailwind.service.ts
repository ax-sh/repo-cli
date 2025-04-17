import { addImportsToSourceFile, addPluginsInDefaultViteConfig } from '@ax-sh/ts-morph-kit'
import { exeCmdWithOutput } from '../../lib'
import { openViteConfigAsSourceFile } from '../gh-pages/gh-pages.service'

export async function addTailwindToViteProject() {
  const sourceFile = openViteConfigAsSourceFile()
  await exeCmdWithOutput('ni tailwindcss @tailwindcss/vite clsx lucide-react')

  addImportsToSourceFile(sourceFile, [
    {
      imports: 'tailwindcss',
      from: '@tailwindcss/vite',
    },
  ])
  addPluginsInDefaultViteConfig(sourceFile, ['tailwindcss()'])
  sourceFile.formatText()
  sourceFile.saveSync()

  return '@import "tailwindcss";'
}
