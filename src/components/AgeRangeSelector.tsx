import type { AgeRange } from '../types'
import { Section } from './Section'
import { SegmentedChoice } from './SegmentedChoice'

const AGE_OPTIONS: { id: AgeRange; label: string }[] = [
  { id: '3-6', label: '3–6 years' },
  { id: '7-9', label: '7–9 years' },
  { id: '10-12', label: '10–12 years' },
]

interface Props {
  value: AgeRange
  onChange: (v: AgeRange) => void
}

export function AgeRangeSelector({ value, onChange }: Props) {
  return (
    <Section label="Age Range">
      <SegmentedChoice
        label=""
        ariaLabel="Reader age range"
        options={AGE_OPTIONS}
        value={value}
        onChange={onChange}
      />
    </Section>
  )
}
