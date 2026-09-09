import type { PeriodId, PlaceId } from '../types'
import { Section } from './Section'
import { SegmentedChoice } from './SegmentedChoice'
import placeIcon from '../assets/icon-place.webp'
import periodIcon from '../assets/icon-period.webp'

const PLACE_OPTIONS: { id: PlaceId; label: string }[] = [
  { id: 'enhanced_forest', label: 'Enchanted Forest' },
  { id: 'bustling_city', label: 'Bustling City' },
  { id: 'underwater_kingdom', label: 'Underwater Kingdom' },
  { id: 'space', label: 'Space' },
]

const PERIOD_OPTIONS: { id: PeriodId; label: string }[] = [
  { id: 'ancient_times', label: 'Ancient Times' },
  { id: 'present_day', label: 'Present Day' },
  { id: 'future_world', label: 'Future World' },
]

interface Props {
  place: PlaceId
  period: PeriodId
  onPlaceChange: (v: PlaceId) => void
  onPeriodChange: (v: PeriodId) => void
}

export function PlaceAndPeriod({ place, period, onPlaceChange, onPeriodChange }: Props) {
  return (
    <>
      <Section label="Place">
        <img src={placeIcon} alt="" className="trio__icon" />
        <SegmentedChoice
          label=""
          ariaLabel="Story place"
          options={PLACE_OPTIONS}
          value={place}
          onChange={onPlaceChange}
        />
      </Section>

      <Section label="Period">
        <img src={periodIcon} alt="" className="trio__icon" />
        <SegmentedChoice
          label=""
          ariaLabel="Story period"
          options={PERIOD_OPTIONS}
          value={period}
          onChange={onPeriodChange}
        />
      </Section>
    </>
  )
}
