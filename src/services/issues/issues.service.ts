import { getJsonFromCmd } from '../../lib/helpers/cmd/cli';

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
  return getJsonFromCmd('gh issue list --json title')
}
