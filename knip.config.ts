import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [],
  entry: ['index.{js,ts}', 'src/index.{js,ts}'],
  project: ['**/*.{js,ts}'],
}

export default config
