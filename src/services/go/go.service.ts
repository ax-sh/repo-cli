import { print } from 'gluegun'
import { exeCmdWithOutput } from '../../lib';

export async function addCodeQualityTools() {
  let out: string

  out = await exeCmdWithOutput('go get -tool github.com/golangci/golangci-lint/cmd/golangci-lint')
  print.info(out)
  out = await exeCmdWithOutput('go get -tool github.com/goreleaser/goreleaser/v2@latest')
  print.info(out)
  out = await exeCmdWithOutput('go get -tool mvdan.cc/gofumpt@latest')
  print.info(out)

  // # release
  // go tool goreleaser --snapshot --clean
  // # tidy imports
  // go tool goimports -l -w .
  // # format
  // go tool gofumpt -l -w .
  return out
}
