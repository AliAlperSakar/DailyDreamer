import { Section } from './Section'

interface Props {
  value: string
  onChange: (v: string) => void
}

export function AdditionalRequest({ value, onChange }: Props) {
  return (
    <Section label="Extra">
      <div className="additional-request">
        <label htmlFor="additional-request" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
          Additional request
        </label>
        <input
          id="additional-request"
          type="text"
          placeholder="Enter additional wishes for the story…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </Section>
  )
}
