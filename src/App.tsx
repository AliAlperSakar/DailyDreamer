import { useState } from 'react'
import type { FormEvent } from 'react'
import { Header } from './components/Header'
import { ThemeSelector } from './components/ThemeSelector'
import { AgeRangeSelector } from './components/AgeRangeSelector'
import { HeroFriendsLength } from './components/HeroFriendsLength'
import { PlaceAndPeriod } from './components/PlaceAndPeriod'
import { CreativitySlider } from './components/CreativitySlider'
import { AdditionalRequest } from './components/AdditionalRequest'
import { GenerateButton } from './components/GenerateButton'
import { LoadingOverlay } from './components/LoadingOverlay'
import { ResultPanel } from './components/ResultPanel'
import { generateStory } from './lib/storyGenerator'
import type { GeneratedStory, StoryRequest } from './types'

const initialRequest: StoryRequest = {
  theme: 'forest',
  ageRange: '7-9',
  place: 'enhanced_forest',
  period: 'present_day',
  hero: '',
  friend: '',
  storyLength: 'medium',
  creativity: 0.5,
  additionalRequest: '',
}

export default function App() {
  const [request, setRequest] = useState<StoryRequest>(initialRequest)
  const [loading, setLoading] = useState(false)
  const [story, setStory] = useState<GeneratedStory | null>(null)

  function update<K extends keyof StoryRequest>(key: K, value: StoryRequest[K]) {
    setRequest((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!request.hero.trim() || !request.friend.trim()) return

    setLoading(true)
    setStory(null)

    // A short, deliberate delay so the loading state (and the moment of
    // anticipation it creates) still means something, even though the
    // generation itself is instant and local.
    window.setTimeout(() => {
      const generated = generateStory(request)
      setStory(generated)
      setLoading(false)
    }, 700)
  }

  function handleGenerateAnother() {
    setStory(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <div className="panel">
        <Header />

        <form onSubmit={handleSubmit}>
          <ThemeSelector value={request.theme} onChange={(v) => update('theme', v)} />
          <AgeRangeSelector value={request.ageRange} onChange={(v) => update('ageRange', v)} />
          <HeroFriendsLength
            hero={request.hero}
            friend={request.friend}
            storyLength={request.storyLength}
            onHeroChange={(v) => update('hero', v)}
            onFriendChange={(v) => update('friend', v)}
            onStoryLengthChange={(v) => update('storyLength', v)}
          />
          <PlaceAndPeriod
            place={request.place}
            period={request.period}
            onPlaceChange={(v) => update('place', v)}
            onPeriodChange={(v) => update('period', v)}
          />
          <CreativitySlider value={request.creativity} onChange={(v) => update('creativity', v)} />
          <AdditionalRequest
            value={request.additionalRequest}
            onChange={(v) => update('additionalRequest', v)}
          />
          <GenerateButton disabled={loading} />
        </form>

        {story && <ResultPanel story={story} onGenerateAnother={handleGenerateAnother} />}

        <p className="footer-note">DreamyTales v2</p>
      </div>

      {loading && <LoadingOverlay />}
    </div>
  )
}
