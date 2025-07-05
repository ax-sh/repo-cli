import { getJsonFromCmd } from '../../lib/helpers/cmd/cli'

export interface GithubRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GithubOwner
  html_url: string
  description: null
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
}

export interface GithubOwner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  user_view_type: string
  site_admin: boolean
}

export interface GithubNpmPackages {
  id: number
  name: string
  package_type: string
  owner?: GithubOwner
  repository: GithubRepository
  version_count: number
  visibility: string
  url: string
  created_at: Date
  updated_at: Date
  html_url: string
}
export async function listNPMPackagesFromGithubRegistry() {
  const user = 'ax-sh'
  const path = `/users/${user}/packages?package_type=npm`
  const cmd = `gh api ${path}`
  // gh api \
  // -H "Accept: application/vnd.github+json" \
  // -H "X-GitHub-Api-Version: 2022-11-28" \
  return getJsonFromCmd<GithubNpmPackages[]>(cmd)
}
