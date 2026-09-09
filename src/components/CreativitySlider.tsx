import { Section } from './Section'
import creativityIcon from '../assets/icon-creativity.webp'

interface Props {
  value: number
  onChange: (v: number) => void
}

export function CreativitySlider({ value, onChange }: Props) {
  return (
    <Section label="Creativity Level">
      <div className="creativity">
        <img src={creativityIcon} alt="" className="creativity__icon" />
        <label htmlFor="creativity" style={{ fontWeight: 600 }}>
          Creativity level
        </label>
        <input
          id="creativity"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="creativity__value">{value.toFixed(2)}</span>
      </div>
    </Section>
  )
}
