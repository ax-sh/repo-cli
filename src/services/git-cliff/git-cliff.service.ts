import { print } from 'gluegun'
import { addScriptToPackageJson } from '../../lib/helpers/cmd/cli'

export async function addGitCliffScriptsToPackageJson() {
  let script: string
  script = await addScriptToPackageJson('cll', 'git cliff -l')
  print.highlight(script)
  script = await addScriptToPackageJson('cl', 'git cliff -u')
  print.highlight(script)
}
