import type { GithubRepo } from '../types'

function shortId(id: number): string {
  return id.toString(16).padStart(7, '0').slice(0, 7)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function RepoList({ repos }: { repos: GithubRepo[] }) {
  if (repos.length === 0) {
    return (
      <section className="repo-list">
        <h2 className="section-title">repos --log</h2>
        <p className="repo-list__empty">No public, non-fork repositories yet.</p>
      </section>
    )
  }

  return (
    <section className="repo-list">
      <h2 className="section-title">repos --log (sorted by stars)</h2>
      <ol className="repo-list__items">
        {repos.slice(0, 15).map((repo) => (
          <li key={repo.id} className="repo-row">
            <span className="repo-row__hash">{shortId(repo.id)}</span>
            <div className="repo-row__main">
              <a
                className="repo-row__name"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>
              {repo.description && (
                <p className="repo-row__description">{repo.description}</p>
              )}
              <div className="repo-row__footer">
                {repo.language && <span className="repo-row__language">{repo.language}</span>}
                <span className="repo-row__date">updated {formatDate(repo.updated_at)}</span>
              </div>
            </div>
            <div className="repo-row__counts">
              <span className="repo-row__count" title="stars">
                ★ {repo.stargazers_count}
              </span>
              <span className="repo-row__count" title="forks">
                ⑂ {repo.forks_count}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
