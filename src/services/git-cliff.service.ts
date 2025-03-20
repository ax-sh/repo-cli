import { addScriptToPackageJson } from '../lib/helpers/cmd/cli';

export async function addGitCliffScriptsToPackageJson() {
  const script = await addScriptToPackageJson('cl', 'git cliff -l')
  console.warn(script);
}
