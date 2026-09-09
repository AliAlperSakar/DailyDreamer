import type { PropsWithChildren } from 'react'

interface SectionProps {
  label: string
}

/** The dark card with the little orange ribbon label — the original's
 * signature "theme-section" look, now a single reusable component instead
 * of copy-pasted markup for every field group. */
export function Section({ label, children }: PropsWithChildren<SectionProps>) {
  return (
    <div className="section">
      <span className="section__ribbon">{label}</span>
      {children}
    </div>
  )
}
