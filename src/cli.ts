import { build } from 'gluegun'

/**
 * Create the cli and kick it off
 */
async function run(argv: string[]) {
  // create a CLI runtime
  const cli = build()
    .brand('repo')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'repo-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

export { run }
