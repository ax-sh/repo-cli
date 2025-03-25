describe('git service test', () => {
  it('should ', async () => {
    const git = await import('./git.service')
    const nextVersion = await git.gitCliffBumpedVersion()
    expect(nextVersion).toBeDefined()
    expect(nextVersion).toEqual(expect.any(String))
  })
})
