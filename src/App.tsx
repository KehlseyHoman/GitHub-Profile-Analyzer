import { SearchBar } from './components/SearchBar'
import { ProfileCard } from './components/ProfileCard'
import { LanguageBar } from './components/LanguageBar'
import { RepoList } from './components/RepoList'
import { useGithubAnalyzer } from './hooks/useGithubAnalyzer'

export default function App() {
  const { state, analyze } = useGithubAnalyzer()

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">profile log</p>
        <h1 className="app__title">GitHub Profile Analyzer</h1>
        <p className="app__subtitle">
          Look up any public GitHub account and read it back as a commit log.
        </p>
        <SearchBar onSearch={analyze} isLoading={state.status === 'loading'} />
      </header>

      <main className="app__main">
        {state.status === 'idle' && (
          <p className="app__hint">Enter a username above to pull their public activity.</p>
        )}

        {state.status === 'error' && <p className="app__error">⚠ {state.message}</p>}

        {state.status === 'success' && (
          <div className="app__results">
            <ProfileCard user={state.data.user} />
            <div className="app__results-right">
              <LanguageBar languages={state.data.languages} />
              <RepoList repos={state.data.repos} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
