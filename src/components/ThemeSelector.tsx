import type { ThemeId } from '../types'
import { Section } from './Section'
import forestImg from '../assets/theme-forest.webp'
import cityImg from '../assets/theme-city.webp'
import underwaterImg from '../assets/theme-underwater.webp'

const THEMES: { id: ThemeId; label: string; img: string }[] = [
  { id: 'forest', label: 'Forest', img: forestImg },
  { id: 'city', label: 'City', img: cityImg },
  { id: 'underwater', label: 'Underwater', img: underwaterImg },
]

interface Props {
  value: ThemeId
  onChange: (theme: ThemeId) => void
}

export function ThemeSelector({ value, onChange }: Props) {
  return (
    <Section label="Theme">
      <div className="theme-grid" role="radiogroup" aria-label="Story theme">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={value === t.id}
            className={`theme-card${value === t.id ? ' is-selected' : ''}`}
            onClick={() => onChange(t.id)}
          >
            <img src={t.img} alt="" />
            <span className="theme-card__label">{t.label}</span>
          </button>
        ))}
      </div>
    </Section>
  )
}
