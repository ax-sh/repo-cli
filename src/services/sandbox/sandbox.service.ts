import { exeCmdWithOutput } from '../../lib'

export async function makePythonSandbox() {
  const cmd = `uv venv && source .venv/bin/activate && uv pip install nbdime matplotlib pillow jupyterlab && touch sandbox.ipynb && pycharm . &`
  return exeCmdWithOutput(cmd)
}
