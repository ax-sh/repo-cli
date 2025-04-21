import { addImportsToSourceFile, addPluginsInDefaultViteConfig, openAsSourceFile } from '@ax-sh/ts-morph-kit'
import { print } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'
import { openViteConfigAsSourceFile } from '../gh-pages/gh-pages.service'

function configureViteConfigWithVitePagesPlugin() {
  const sourceFile = openViteConfigAsSourceFile()
  addImportsToSourceFile(sourceFile, [
    { imports: 'Pages', from: 'vite-plugin-pages' },
  ])
  addPluginsInDefaultViteConfig(sourceFile, ['Pages()'])
  sourceFile.formatText()
  sourceFile.saveSync()
}

function configureViteReactMainFile() {
  const mainFile = 'src/main.tsx'
  const sourceFile = openAsSourceFile(mainFile)

  addImportsToSourceFile(sourceFile, [
    { imports: ['HashRouter'], from: 'react-router-dom' },
  ])
  sourceFile.formatText()
  sourceFile.saveSync()
  print.highlight(` 
   <HashRouter basename="/">
     <App />
   </HashRouter>
  `)
}

export async function addVitePluginPages() {
  await exeCmdWithOutput('ni -D vite-plugin-pages')
  await exeCmdWithOutput('ni react-router react-router-dom react-error-boundary')
  configureViteConfigWithVitePagesPlugin()
  configureViteReactMainFile()

  print.info('ref: https://www.npmjs.com/package/vite-plugin-pages')
  const out = 'done'
  return out
}
