import { print, system } from 'gluegun'
import { err, ok } from 'neverthrow'
import { exeCmdWithOutput } from '../../lib'

async function addScript(commandName: string, cmd: string, cwd: string): Promise<string> {
  const triggerCmd = `npm pkg set scripts.${commandName}="${cmd}"`
  return exeCmdWithOutput(triggerCmd, cwd)
}

async function exeCmdInDir(cmd: string, cwd?: string): Promise<string> {
  return await system.exec(cmd, { cwd, stdio: 'inherit' }) as string
}

export async function makeDefaultMonoRepoWorkspace(projectWorkspaceName?: string) {
  const hasError = !projectWorkspaceName
  if (hasError) {
    const error = 'need a valid monorepo name'
    return err(error)
  }

  let out: string

  const libName = 'core';
  const appName = 'cli';

  print.info('📦 Installing Nx Plugins...');
  const initialBareBoneProject = `bunx create-nx-workspace@latest ${projectWorkspaceName} --preset=apps --packageManager=bun --interactive=false --dryrun`
  out = await exeCmdInDir(initialBareBoneProject)
  print.highlight(out)

  out = await exeCmdInDir(`bun add -D @nx/node @nx/vitest vitest msw @biomejs/biome @nx/workspace typescript eslint-plugin-only-warn @types/node`, projectWorkspaceName);
  print.highlight(out)

  out = await exeCmdInDir(`bun add zod neverthrow picocolors @logtape/file @logtape/logtape @logtape/pretty app-root-path`, projectWorkspaceName);
  print.highlight(out)

  print.info('🖥️  Generating CLI Application...');
  const makeAppCmd = `nx g @nx/node:application ${appName} --directory=apps/${appName} --useProjectJson=false --framework=none --bundler=esbuild --e2eTestRunner=none --docker=false --linter=eslint --unitTestRunner=none`
  out = await exeCmdInDir(makeAppCmd, projectWorkspaceName)
  print.success('makeAppCmd')
  print.highlight(out)

  print.info('🛠️  Generating logger Library...');
  const makeLoggerLibCmd = `nx g @nx/js:library logger --directory=libs/logger --importPath=@${projectWorkspaceName}/logger --unitTestRunner=vitest --bundler=swc --linter=eslint`
  out = await exeCmdInDir(makeLoggerLibCmd, projectWorkspaceName)
  print.success('makeLoggerLibCmd')
  print.highlight(out)

  print.info('🛠️  Generating Core Library...');
  const makeLibCmd = `nx g @nx/node:library ${libName} --directory=libs/${libName} --importPath=@${projectWorkspaceName}/${libName} --unitTestRunner=none --bundler=swc --linter=eslint`
  out = await exeCmdInDir(makeLibCmd, projectWorkspaceName)
  print.success('makeLibCmd')
  print.highlight(out)

  print.info('🛠️  Generating Core Library test setup...');
  out = await exeCmdInDir('nx g @nx/vitest:configuration --project core', projectWorkspaceName)
  print.success('vitest core')
  print.highlight(out)

  print.info('📦 Adding helper scripts CLI Application...');
  out = await addScript('fmt', 'deno fmt', projectWorkspaceName)
  out = await addScript('show', 'nx show projects --json | jq', projectWorkspaceName)
  print.success('helper scripts')
  print.highlight(out)
  // console.log(`\n✅ Setup Complete! Project created at: ${rootDir}`);

  return ok('Setup Complete')
}
