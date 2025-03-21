describe('[issues] service test', () => {
  it('should ', async () => {
    const mod = await import('./issues.service')
    expect(mod).toBeDefined()

    const out = await mod.listIssues()
    console.warn(out)
  });
});
