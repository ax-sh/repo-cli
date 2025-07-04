import { exeCmdWithOutput } from '../../lib'

export async function makePythonSandbox() {
  const cmd = `uv venv && source .venv/bin/activate && uv pip install nbdime matplotlib pillow jupyterlab && touch sandbox.ipynb && pycharm . &`
  return exeCmdWithOutput(cmd)
}

export async function makePythonUVSandbox() {
  const cmd = `uv venv && source .venv/bin/activate && uv init && uv add pip nbdime marimo numpy matplotlib pillow jupyterlab && touch sandbox.ipynb && pycharm . &`
  return exeCmdWithOutput(cmd)
}

// #!/usr/bin/env tsx
export async function runPySandboxSetup() {
  const command =
    'uv venv && source .venv/bin/activate && uv pip install nbdime matplotlib pillow jupyterlab && touch sandbox.ipynb'

  console.info('🚀 Running sandbox setup...')
  console.info(`📝 Command: ${command}`)
  console.info('─'.repeat(50))
  const { execa } = await import('execa')

  try {
    // Execute the one-liner command
    const result = await execa('bash', ['-c', command], {
      stdio: 'pipe',
      all: true, // Combine stdout and stderr
    })

    // Print all output
    if (result.all) {
      console.info(result.all)
    }

    console.info('✅ Setup completed successfully!')
    console.info('─'.repeat(50))

    // Now open PyCharm
    console.info('🔄 Opening PyCharm...')

    try {
      await execa('pycharm', ['sandbox.ipynb'], {
        stdio: 'ignore',
        detached: true,
      })
      console.info('✅ PyCharm opened successfully')
    } catch (pycharmError) {
      console.info('⚠️  Trying alternative PyCharm commands...', pycharmError)

      const alternatives = [
        'pycharm64.exe',
        '/Applications/PyCharm.app/Contents/MacOS/pycharm',
        'charm',
      ]

      let opened = false
      for (const cmd of alternatives) {
        try {
          await execa(cmd, ['sandbox.ipynb'], {
            stdio: 'ignore',
            detached: true,
          })
          console.info(`✅ Opened with ${cmd}`)
          opened = true
          break
        } catch {
          // continue
        }
      }

      if (!opened) {
        console.info('❌ Could not open PyCharm automatically')
        console.info('   Please open sandbox.ipynb manually in PyCharm')
      }
    }
  } catch (e: unknown) {
    const error = e as {
      all: string
      stdout: string
      stderr: string
      message: string
    }
    console.error('❌ Command failed:')

    // Print all output including errors
    if (error.all) {
      console.error(error.all)
    } else {
      if (error.stdout) {
        console.error('stdout:', error.stdout)
      }
      if (error.stderr) {
        console.error('stderr:', error.stderr)
      }
    }

    console.error('Error details:', error.message)
    process.exit(1)
  }
}

// runSandboxSetup().catch(console.error);
