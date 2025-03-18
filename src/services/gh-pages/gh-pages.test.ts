describe('gh-pages', () => {
  it('should load modules', async () => {
    const ts = await import('@ax-sh/ts-morph-kit')
    console.debug(ts);
    expect(ts).toBeDefined()
  });
});
