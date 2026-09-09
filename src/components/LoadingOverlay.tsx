export function LoadingOverlay() {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div>
        <div className="loading-overlay__spinner" />
        <p className="loading-overlay__text">Dreaming up your story…</p>
      </div>
    </div>
  )
}
