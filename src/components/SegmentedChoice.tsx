interface Option<T extends string> {
  id: T
  label: string
}

interface Props<T extends string> {
  label: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
}

/** Shared "row of pill buttons" control used for age range, place, period,
 * and story length — the original had four near-identical hand-written
 * copies of this; v2 has one generic component. */
export function SegmentedChoice<T extends string>({
  label,
  options,
  value,
  onChange,
  ariaLabel,
}: Props<T>) {
  return (
    <div>
      {label && <p className="section__title">{label}</p>}
      <div className="segmented" role="radiogroup" aria-label={ariaLabel}>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={value === opt.id}
            className={`segmented-btn${value === opt.id ? ' is-selected' : ''}`}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
