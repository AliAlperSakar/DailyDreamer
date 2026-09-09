import generateIcon from '../assets/icon-generate.webp'

interface Props {
  disabled?: boolean
}

export function GenerateButton({ disabled }: Props) {
  return (
    <div className="generate-row">
      <button
        type="submit"
        className="generate-btn generate-btn--shake"
        disabled={disabled}
        aria-label="Generate story"
      >
        <img src={generateIcon} alt="Generate story" />
      </button>
    </div>
  )
}
