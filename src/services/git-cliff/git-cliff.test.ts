import { filesystem } from 'gluegun'

function generateConfigsFromTemplate() {
  const files = ['cliff.toml']
  const fileConfigs = files.map((fileName) => ({
    // directory: "CONFIGS/tailwind",
    template: `/CONFIGS/git-cliff/${fileName}`,
    target: filesystem.path('.', fileName),
  }))
  return fileConfigs
}

describe('git cliff test', () => {
  it('should generate config template to copy', () => {
    const fileConfigs = generateConfigsFromTemplate()
    expect(fileConfigs).toBeDefined()
    expect(fileConfigs).toHaveLength(1)
    const [fileConfig] = fileConfigs

    expect(fileConfig).toEqual({
      template: '/CONFIGS/git-cliff/cliff.toml',
      target: expect.any(String),
    })
  })
})
