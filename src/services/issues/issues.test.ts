import g from 'gluegun';

vi.mock('gluegun', { spy: true })

describe('[issues] service test', () => {
  it('should ', async () => {
    const mod = await import('./issues.service')
    expect(mod).toBeDefined()

    const out = await mod.listIssues()
    console.warn(out)
  });
  it('should create issues', async () => {
    const fn = vi.mocked(g.system.run)
    fn.mockResolvedValue('https://github.com/user/repo/issues/mocked')
    const mod = await import('./issues.service')

    const out = await mod.createIssue('title', 'body')
    expect(out).toEqual('https://github.com/user/repo/issues/mocked');
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith('gh issue create -a @me -t title -b body ', {
      trim: true,
    })

    // console.log(fn.mock.calls);
  });
});
