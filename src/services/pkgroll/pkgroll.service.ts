import { print } from 'gluegun'
import { addScriptToPackageJson, exeCmdWithOutput } from '../../lib'

export async function addPkgrollDeps() {
  const spinner = print.spin(`Adding pkgroll`)

  await exeCmdWithOutput('ni -D pkgroll rimraf')
  await addScriptToPackageJson(
    'pub',
    'nr prepublishOnly && npm publish --scope=@ax-sh --registry=https://npm.pkg.github.com',
  )
  await addScriptToPackageJson('pub:dry', 'nr pub --dry-run')

  try {
    await addScriptToPackageJson('clean', 'rimraf dist')
  } catch (e: unknown) {
    console.error('addScriptToPackageJson error adding clean command', e)
  }

  spinner.succeed(`Added pkgroll`)
}
