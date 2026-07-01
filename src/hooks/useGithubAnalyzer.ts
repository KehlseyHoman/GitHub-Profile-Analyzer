import { useState, useCallback } from 'react'
import type { FetchState, GithubUser, GithubRepo, LanguageTotal } from '../types'

interface AnalyzerResult {
  user: GithubUser
  repos: GithubRepo[]
  languages: LanguageTotal[]
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (res.status === 404) {
    throw new Error('No GitHub user found with that username.')
  }
  if (res.status === 403) {
    throw new Error('GitHub API rate limit hit. Wait a minute and try again.')
  }
  if (!res.ok) {
    throw new Error(`GitHub API error (${res.status}).`)
  }
  return res.json() as Promise<T>
}

function deriveLanguages(repos: GithubRepo[]): LanguageTotal[] {
  const counts = new Map<string, number>()
  for (const repo of repos) {
    if (!repo.language || repo.fork) continue
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

export function useGithubAnalyzer() {
  const [state, setState] = useState<FetchState<AnalyzerResult>>({ status: 'idle' })

  const analyze = useCallback(async (usernameRaw: string) => {
    const username = usernameRaw.trim()
    if (!username) return

    setState({ status: 'loading' })
    try {
      const [user, repos] = await Promise.all([
        fetchJson<GithubUser>(`https://api.github.com/users/${username}`),
        fetchJson<GithubRepo[]>(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        ),
      ])

      const sortedRepos = [...repos]
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)

      setState({
        status: 'success',
        data: { user, repos: sortedRepos, languages: deriveLanguages(repos) },
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setState({ status: 'error', message })
    }
  }, [])

  return { state, analyze }
}
