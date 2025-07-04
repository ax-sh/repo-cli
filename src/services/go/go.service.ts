import { filesystem, print } from 'gluegun'
import { KnownError } from '../../errors'
import { exeCmdWithOutput } from '../../lib'

export async function makeGoCobraCli(name: string) {
  let out: string
  try {
    out = await exeCmdWithOutput(`go mod init ${name}`)
    print.highlight(`go mod init ${name}`)
  } catch (e) {
    print.highlight(`[Skipped] go.mod already exists ${e}`)
  }
  try {
    out = await exeCmdWithOutput('go install github.com/spf13/cobra-cli@latest')
  } catch {
    print.highlight('Warn updating cobra-cli using old one')
  }

  out = await exeCmdWithOutput('cobra-cli init --viper --author ax-sh && cobra-cli add config')
  print.info(out)
}

// [GitHub - go-cmd/cmd: Non-blocking external commands in Go with streaming output](https://github.com/go-cmd/cmd)
// [GitHub - bitfield/script: Making it easy to write shell-like scripts in Go](https://github.com/bitfield/script/tree/master)
// https://www.toptal.com/developers/gitignore/api/go

export async function addGoLibs() {
  const libs = [
    'go get github.com/spf13/afero',
    'go get github.com/spf13/viper',
    'go get github.com/spf13/cobra',
    // testing
    'go get github.com/k0kubun/pp',
    'go get github.com/stretchr/testify',
    // utils
    'go get github.com/samber/mo@v1',
    'go get github.com/samber/lo@v1',
    // tui
    'go get github.com/charmbracelet/bubbletea',
    'go get github.com/charmbracelet/huh',
    'go get github.com/charmbracelet/glamour',
    'go get github.com/charmbracelet/log@latest',
    'go get github.com/charmbracelet/fang',
    'go get github.com/charmbracelet/lipgloss',
    'go get github.com/charmbracelet/bubbles',
    // script runner
    'go get github.com/bitfield/script',
    'go get github.com/go-cmd/cmd',

  ]
  for (const lib of libs) {
    const output = await exeCmdWithOutput(lib)
    print.highlight(`Added ${lib} ${output}`)
  }
  return libs.join('\n')
}

const GO_GITIGNORE = `# If you prefer the allow list template instead of the deny list, see community template:
# https://github.com/github/gitignore/blob/main/community/Golang/Go.AllowList.gitignore
#
# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with \`go test -c\`
*.test

# Code coverage profiles and other test artifacts
*.out
coverage.*
*.coverprofile
profile.cov

# Dependency directories (remove the comment below to include it)
# vendor/

# Go workspace file
go.work
go.work.sum

# env file
.env

# Editor/IDE
.idea/
.vscode/
`
export async function addGoGitIgnore() {
  print.info(`Adding go .gitignore `)
  filesystem.write('./.gitignore', GO_GITIGNORE)
}

export async function addCodeQualityTools() {
  const isGoRepo = filesystem.isFile('go.mod')
  if (!isGoRepo) {
    throw new KnownError('not go repo')
  }
  let out: string
  out = await exeCmdWithOutput(
    'go get -tool gotest.tools/gotestsum@latest',
  )
  print.info(out)
  out = await exeCmdWithOutput(
    'go get -tool github.com/golang/mock/mockgen',
  )
  print.info(out)

  out = await exeCmdWithOutput(
    'go get -tool github.com/golangci/golangci-lint/cmd/golangci-lint',
  )
  print.info(out)
  out = await exeCmdWithOutput(
    'go get -tool github.com/goreleaser/goreleaser/v2@latest',
  )
  print.info(out)
  out = await exeCmdWithOutput('go get -tool mvdan.cc/gofumpt@latest')
  print.info(out)
  out = await exeCmdWithOutput(
    'go get -tool golang.org/x/tools/cmd/goimports@latest',
  )
  print.info(out)

  const howToUse = `
  # lint
  go tool golangci-lint run
  # release
  go tool goreleaser --snapshot --clean
  # tidy imports
  go tool goimports -l -w .
  # format
  go tool gofumpt -l -w .
  `
  return howToUse
}
