import type { StoryLength } from '../types'
import { Section } from './Section'
import { SegmentedChoice } from './SegmentedChoice'
import heroIcon from '../assets/icon-hero.webp'
import friendsIcon from '../assets/icon-friends.webp'
import lengthIcon from '../assets/icon-length.webp'

const LENGTH_OPTIONS: { id: StoryLength; label: string }[] = [
  { id: 'short', label: 'Short' },
  { id: 'medium', label: 'Medium' },
  { id: 'long', label: 'Long' },
]

interface Props {
  hero: string
  friend: string
  storyLength: StoryLength
  onHeroChange: (v: string) => void
  onFriendChange: (v: string) => void
  onStoryLengthChange: (v: StoryLength) => void
}

export function HeroFriendsLength({
  hero,
  friend,
  storyLength,
  onHeroChange,
  onFriendChange,
  onStoryLengthChange,
}: Props) {
  return (
    <Section label="Hero, Friends &amp; Length">
      <div className="trio">
        <div className="trio__card">
          <img src={heroIcon} alt="" className="trio__icon" />
          <label className="trio__label" htmlFor="hero-input">
            Hero
          </label>
          <div className="input-box">
            <input
              id="hero-input"
              name="hero"
              type="text"
              required
              value={hero}
              onChange={(e) => onHeroChange(e.target.value)}
            />
            <span>Hero&apos;s name</span>
          </div>
        </div>

        <div className="trio__card">
          <img src={friendsIcon} alt="" className="trio__icon" />
          <label className="trio__label" htmlFor="friend-input">
            Friend
          </label>
          <div className="input-box">
            <input
              id="friend-input"
              name="friend"
              type="text"
              required
              value={friend}
              onChange={(e) => onFriendChange(e.target.value)}
            />
            <span>Friend&apos;s name</span>
          </div>
        </div>

        <div className="trio__card">
          <img src={lengthIcon} alt="" className="trio__icon" />
          <label className="trio__label" htmlFor="length-choice">
            Story length
          </label>
          <div id="length-choice">
            <SegmentedChoice
              label=""
              ariaLabel="Story length"
              options={LENGTH_OPTIONS}
              value={storyLength}
              onChange={onStoryLengthChange}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
