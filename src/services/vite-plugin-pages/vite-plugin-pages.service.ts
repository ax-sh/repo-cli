import {
  addImportsToSourceFile,
  addPluginsInDefaultViteConfig,
  openAsSourceFile,
} from '@ax-sh/ts-morph-kit'
import { print } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'
import { openViteConfigAsSourceFile } from '../gh-pages/gh-pages.service'
import { updateTypesOnTsConfig } from '../tsconfig/tsconfig.service'

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
  const mainFile = './src/main.tsx'
  const sourceFile = openAsSourceFile(mainFile)

  addImportsToSourceFile(sourceFile, [
    { imports: ['HashRouter'], from: 'react-router-dom' },
  ])
  sourceFile.formatText()
  sourceFile.saveSync()

  print.highlight(` 
    // main.tsx
    import { HashRouter } from 'react-router-dom';

    <HashRouter basename="/">
       <App />
    </HashRouter>
   
    // vite-env.d.ts
    /// <reference types="vite-plugin-pages/client-react" />
   //  adding it on tsconfig also works 
   
   function Loader() {
      return (
        <Layout>
          <FillViewPort>
            <h1>Innicement</h1>
          </FillViewPort>
        </Layout>
      );
    }
    // errors.tsx
        
    function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
      return (
        <Layout className={'container'}>
          <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button type="button" onClick={resetErrorBoundary}>Try again</button>
          </div>
        </Layout>
      );
    }
    
    export function AppErrorBoundary({ children }: PropsWithChildren) {
      return (
        <ErrorBoundary
          FallbackComponent={AppErrorFallback}
          onReset={(details) => {
            console.warn(details);
            // Reset the state of your app so the error doesn't happen again
          }}
        >
          {children}
        </ErrorBoundary>
      );
    }
        
    
    // App.tsx
    import routes from '~react-pages';
    function App() {
      return <AppErrorBoundary><Suspense fallback={<Loader />}>{useRoutes(routes)}</Suspense></AppErrorBoundary>;
    }
  `)
}

function addVitePluginPagesTypesToTsConfig() {
  const tsConfigJson = '{}'
  const updatedTsConfigJson = updateTypesOnTsConfig(tsConfigJson, [
    'vite-plugin-pages/client-react',
  ])
  console.warn('todo updatedTsConfigJson', updatedTsConfigJson)
}

export async function addVitePluginPages() {
  await exeCmdWithOutput('ni -D vite-plugin-pages')
  await exeCmdWithOutput(
    'ni react-router react-router-dom react-error-boundary',
  )
  configureViteConfigWithVitePagesPlugin()
  configureViteReactMainFile()
  addVitePluginPagesTypesToTsConfig()

  print.info('ref: https://www.npmjs.com/package/vite-plugin-pages')
  const out = 'done'
  return out
}
