import { FormEvent, useState } from 'react'

interface SearchBarProps {
  onSearch: (username: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__prompt">git log --author=</span>
      <input
        className="search-bar__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="username"
        aria-label="GitHub username"
        autoFocus
      />
      <button className="search-bar__button" type="submit" disabled={isLoading}>
        {isLoading ? 'looking...' : 'run'}
      </button>
    </form>
  )
}
