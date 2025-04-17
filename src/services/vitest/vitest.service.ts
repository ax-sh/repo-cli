import { print } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'

export async function addVitestDeps() {
  return exeCmdWithOutput('ni -D vitest msw@latest @faker-js/faker')
}

export async function addVitestWithReactTesting() {
  await exeCmdWithOutput('ni -D vitest @testing-library/react @testing-library/dom @types/react @types/react-dom msw@latest @faker-js/faker')

  print.info('done')
  const out = 'out'
  return out
}
