import logo from '../assets/logo.webp'

export function Header() {
  return (
    <header className="header">
      <img src={logo} alt="DreamyTales" className="header__logo" />
      <p className="header__tagline">
        Pick a hero, a place, and a mood — get a one-of-a-kind bedtime story.
      </p>
    </header>
  )
}
