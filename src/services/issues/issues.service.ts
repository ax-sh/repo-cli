import { exeCmdWithOutput, getJsonFromCmd } from '../../lib/helpers/cmd/cli'

export async function createIssue(title: string, body: string) {
  return exeCmdWithOutput(`gh issue create -a @me -t ${title} -b ${body} `)
}
//
// gh api 'repos/ax-sh/repo-cli/issues' --paginate
// gh api 'repos/{owner}/{repo}/issues' --paginate
interface IssuesResponse {
  isPinned: boolean
  author: { login: string, is_bot: boolean, id: string, name: string }
  title: string
  createdAt: string
  updatedAt: string
  labels: string[]
  url: string
}
export async function listIssues() {
  //  assignees
  //   author
  //   body
  //   closed
  //   closedAt
  //   comments
  //   createdAt
  //   id
  //   isPinned
  //   labels
  //   milestone
  //   number
  //   projectCards
  //   projectItems
  //   reactionGroups
  //   state
  //   stateReason
  //   title
  //   updatedAt
  //   url
  return getJsonFromCmd<IssuesResponse[]>(
    'gh issue list --json isPinned,author,title,createdAt,updatedAt,labels,url',
  )
}
