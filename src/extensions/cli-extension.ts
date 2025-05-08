import type { GluegunToolbox } from 'gluegun'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
export default async (toolbox: GluegunToolbox) => {
  toolbox.lib = await import('../lib/index')
  const hasPy = toolbox.system.which('python')
  if (hasPy != null) {
    process.env.PYTHON_BIN = hasPy
  }
  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "repo" property),
  // repo.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("repo", process.cwd())
  // }
}
