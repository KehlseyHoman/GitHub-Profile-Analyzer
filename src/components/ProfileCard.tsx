import type { GithubUser } from '../types'

function formatJoinDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function ProfileCard({ user }: { user: GithubUser }) {
  return (
    <section className="profile-card">
      <img className="profile-card__avatar" src={user.avatar_url} alt={`${user.login} avatar`} />
      <div className="profile-card__body">
        <h1 className="profile-card__name">{user.name ?? user.login}</h1>
        <a
          className="profile-card__handle"
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
        >
          @{user.login}
        </a>
        {user.bio && <p className="profile-card__bio">{user.bio}</p>}

        <dl className="profile-card__meta">
          {user.company && (
            <div className="profile-card__meta-row">
              <dt>org</dt>
              <dd>{user.company}</dd>
            </div>
          )}
          {user.location && (
            <div className="profile-card__meta-row">
              <dt>loc</dt>
              <dd>{user.location}</dd>
            </div>
          )}
          <div className="profile-card__meta-row">
            <dt>since</dt>
            <dd>{formatJoinDate(user.created_at)}</dd>
          </div>
        </dl>

        <div className="profile-card__stats">
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">{user.public_repos}</span>
            <span className="profile-card__stat-label">repos</span>
          </div>
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">{user.followers}</span>
            <span className="profile-card__stat-label">followers</span>
          </div>
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">{user.following}</span>
            <span className="profile-card__stat-label">following</span>
          </div>
        </div>
      </div>
    </section>
  )
}
