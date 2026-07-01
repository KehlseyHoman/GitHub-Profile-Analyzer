import type { LanguageTotal } from '../types'

const DIFF_COLORS = ['var(--add)', 'var(--del)', 'var(--accent)', '#8A6D3B', '#5B6B8C', '#7A5C7A']

export function LanguageBar({ languages }: { languages: LanguageTotal[] }) {
  if (languages.length === 0) return null

  const total = languages.reduce((sum, l) => sum + l.count, 0)

  return (
    <section className="lang-bar">
      <h2 className="section-title">languages --stat</h2>
      <div className="lang-bar__track">
        {languages.map((lang, i) => (
          <div
            key={lang.language}
            className="lang-bar__segment"
            style={{
              width: `${(lang.count / total) * 100}%`,
              background: DIFF_COLORS[i % DIFF_COLORS.length],
            }}
            title={`${lang.language}: ${lang.count} repo${lang.count === 1 ? '' : 's'}`}
          />
        ))}
      </div>
      <ul className="lang-bar__legend">
        {languages.map((lang, i) => (
          <li key={lang.language} className="lang-bar__legend-item">
            <span
              className="lang-bar__swatch"
              style={{ background: DIFF_COLORS[i % DIFF_COLORS.length] }}
            />
            <span className="lang-bar__legend-name">{lang.language}</span>
            <span className="lang-bar__legend-count">{lang.count}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
