import { print } from 'gluegun'
import { exeCmdWithOutput } from '../../lib'

export async function addUnoCssToRepo() {
  const spinner = print.spin(`Adding unocss`)

  print.info(`Todo unocss`)
  // https://unocss.dev/integrations/eslint
  await exeCmdWithOutput('ni -D unocss @unocss/eslint-config')
  await exeCmdWithOutput('ni @unocss/reset')
  // vite.config.ts
  // import UnoCSS from 'unocss/vite'
  // import { defineConfig } from 'vite'
  //
  // export default defineConfig({
  //   plugins: [
  //     UnoCSS(),
  //   ],
  // })
  // // uno.config.ts
  //
  // import { defineConfig } from 'unocss'
  //
  // export default defineConfig({
  //   // ...UnoCSS options
  // })
  // https://unocss.dev/integrations/vite
  // // main.ts
  // import '@unocss/reset/tailwind.css'
  // or import '@unocss/reset/tailwind-compat.css'
  // import 'virtual:uno.css'

  spinner.succeed(`Added unocss`)
}
