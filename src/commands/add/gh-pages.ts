import type { GluegunCommand } from 'gluegun'
import type { ExtendedToolbox } from '../../types'
import { KnownError } from '../../errors';

const command: GluegunCommand<ExtendedToolbox> = {
  name: 'gh-pages',
  alias: ['gh-page'],
  description: 'adds config to vitest react for gh-page deploy compatible',
  run: async (toolbox) => {
    const { print, lib } = toolbox

    const gh = await import('../../services/gh-pages/gh-pages.service')
    const { homepageUrl, nameWithOwner, url, visibility, createdAt, updatedAt, ...json } = await gh.getGithubRepoInfo()
    print.highlight(json)
    print.highlight(createdAt)
    print.highlight(updatedAt)
    if (visibility === 'PRIVATE') {
      throw new KnownError('Gh pages does not work in Private repos for free users')
    }

    const spinner = print.spin('Adding gh-pages')
    try {
      await gh.checkIfPushedToRemote()
      await gh.addGithubPagesDependencies()
      await gh.configViteConfigForGhPages()
    }
    catch (e) {
      print.error(e)
    }
    spinner.fail(`Todo gh-pages`)

    await lib.addScriptToPackageJson('deploy', 'nr build && gh-pages -d dist')
    await lib.addScriptToPackageJson('clean', 'rimraf dist')

    print.info(`set homepage to ${homepageUrl}`)
    print.info(`set repo url ${url}`)
    await gh.setHomepageUrlOnGithubRepoDescription(nameWithOwner, homepageUrl)
  },
}

export default command
