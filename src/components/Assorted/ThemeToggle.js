import { useState } from "react"

export const themes = {
  OCEAN: 'Ocean',
  DEEP_OCEAN: 'Deep Ocean'
}

export const ThemeToggle = ({ theme, onToggle }) => {
  const [ , setTheme ] = useState(theme)

  useState(() => {
    setTheme(theme)
  }, [theme])

  return (
    <section className="ThemeToggle">
      {
        Object.keys(themes).map((key, idx) => {
          const themeName = themes[key]
          const selected = theme === key ? '--selected' : ''

          return <div key={idx} className="--button -container" 
            onClick={() => onToggle(key)}>
            <div className={`--radio --button --${key} ${selected}`}/>
            <span className={`--${key} ${selected} --theme-text`}>{themeName}</span>
          </div>
        })
      }
    </section>
  )
}