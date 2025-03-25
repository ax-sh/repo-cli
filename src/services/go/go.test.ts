describe('[go] service test', () => {
  it.fails('should addCodeQualityTools', async () => {
    const mod = await import('./go.service')
    expect(mod).toBeDefined()

    const out = await mod.addCodeQualityTools()
    expect(out).toEqual('not go repo')
  })
})
