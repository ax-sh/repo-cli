describe('[go] service test', () => {
  it('should ', async () => {
    const mod = await import('./go.service')
    expect(mod).toBeDefined()

    const out = await mod.addCodeQualityTools()
    console.warn(out)
  })
})
