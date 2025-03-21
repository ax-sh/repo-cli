import g from 'gluegun'

vi.mock('gluegun', { spy: true })
describe('[issues] service test', () => {
  it('should ', async () => {
    const mod = await import('./issues.service')
    expect(mod).toBeDefined()

    const out = await mod.listIssues()
    console.warn(out)
  });
  it('should create issues', async () => {
    const cmd = 'gh issue create -a @me -t test_title -b test_body '
    const fn = vi.mocked(g.system.run)
    fn.mockImplementation(async (args) => {
      expect(args).toEqual(cmd);
      return 'https://github.com/user/repo/issues/mocked'
    })
    const mod = await import('./issues.service')

    const out = await mod.createIssue('test_title', 'test_body')
    expect(out).toEqual('https://github.com/user/repo/issues/mocked');
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(cmd, {
      trim: true,
    })

    // console.log(fn.mock.calls);
  });
});
