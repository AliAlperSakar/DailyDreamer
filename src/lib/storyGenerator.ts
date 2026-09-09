import type { AgeRange, GeneratedStory, PeriodId, PlaceId, StoryRequest, ThemeId } from '../types'

/**
 * This is a deliberately offline, client-side "story engine" — no API key,
 * no server, no network call. The original prototype called OpenAI's chat
 * API on a real backend; this v2 rewrite trades that for something that
 * works instantly on a static GitHub Pages deploy, at zero cost, forever.
 *
 * It leans on the same idea the original system prompt did (age-appropriate,
 * warm, a little educational) but assembles a story from hand-written
 * building blocks instead of a language model.
 */

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length) % arr.length]
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const THEME_WORDS: Record<ThemeId, { creature: string; mood: string; sparkle: string }> = {
  forest: { creature: 'fox', mood: 'earthy and green', sparkle: 'fireflies' },
  city: { creature: 'pigeon', mood: 'bright and busy', sparkle: 'streetlights' },
  underwater: { creature: 'dolphin', mood: 'cool and blue', sparkle: 'bioluminescent jellyfish' },
}

const PLACE_WORDS: Record<PlaceId, { name: string; titleName: string; detail: string[] }> = {
  enhanced_forest: {
    name: 'an enchanted forest',
    titleName: 'the Enchanted Forest',
    detail: [
      'where the trees glowed faintly at dusk',
      'where mushrooms as tall as doorways lined the path',
      'where the leaves whispered old songs when the wind passed through',
    ],
  },
  bustling_city: {
    name: 'a bustling city',
    titleName: 'the Bustling City',
    detail: [
      'full of honking cars, corner bakeries, and rooftop gardens',
      'where trams rattled past windows stacked five stories high',
      'that never quite slept, humming with light long after sunset',
    ],
  },
  underwater_kingdom: {
    name: 'a hidden underwater kingdom',
    titleName: 'the Underwater Kingdom',
    detail: [
      'built from coral towers and pearl-lined streets',
      'where schools of silver fish moved like ribbons through the current',
      'lit from below by glowing sea plants',
    ],
  },
  space: {
    name: 'a small colony orbiting a quiet, ringed planet',
    titleName: 'the Stars Above',
    detail: [
      'where the stars never blinked and the air smelled faintly of ozone',
      'strung together by glass tunnels that looked out on drifting moons',
      'where gravity was gentle enough to make every step feel like a hop',
    ],
  },
}

const PERIOD_WORDS: Record<PeriodId, string[]> = {
  ancient_times: [
    'long before maps had names for every corner of the world',
    'in an age when stories were the only way news traveled',
    'back when every village kept its own storyteller by the fire',
  ],
  present_day: [
    'on an ordinary Tuesday that was about to become anything but',
    'this past summer, when the days stretched long and gold',
    'not long ago, in a week that started like any other',
  ],
  future_world: [
    'in a future where helper-drones tidied the rooftops at dawn',
    'a hundred years from now, when hover-bikes hummed past school gates',
    'in a tomorrow built from solar glass and quiet machines',
  ],
}

const OBSTACLES = [
  'a puzzle that only worked if two people solved it together',
  'a storm that scattered everyone\'s carefully laid plans',
  'a locked door with no visible key, and a riddle carved beside it',
  'a shy stranger who needed a friend more than anyone realized',
  'a map with one crucial piece missing, right where home should be',
]

const TWISTS_LOW = [
  'It turned out the answer had been close by the whole time.',
  'A little patience, and a little help, was all it took.',
  'The simplest idea in the room ended up being the right one.',
]

const TWISTS_HIGH = [
  'Just when hope seemed thin, the sparkle nearby began to hum — and everything nearby lifted an inch off the ground.',
  'The riddle rearranged itself the moment they said it out loud together, like it had been waiting for two voices instead of one.',
  'What looked like an ending unfolded into a door, and behind the door was a place neither of them had ever imagined.',
]

const MORALS = [
  'that the best adventures are the ones you don\'t take alone',
  'that curiosity, kept kind, always finds a way forward',
  'that even the smallest voice can change how a whole day turns out',
  'that being a little afraid is fine, as long as you keep walking',
]

const AGE_DESCRIPTORS: Record<AgeRange, string[]> = {
  '3-6': ['a big', 'a fun', 'a happy'],
  '7-9': ['a curious', 'an unexpected', 'a slightly wobbly'],
  '10-12': ['an oddly familiar', 'an almost impossible', 'a quietly remarkable'],
}

/** Keeps sentences short and plain for younger readers, fuller for older ones. */
function ageVoice(age: AgeRange) {
  const descriptor = (rng: () => number) => pick(AGE_DESCRIPTORS[age], rng)
  const trim = age === '3-6'
  return {
    descriptor,
    flourish: (s: string) => (trim ? s.split(/(?<=\. )/).slice(0, 2).join('') : s),
  }
}

function lengthToBeats(length: StoryRequest['storyLength']) {
  switch (length) {
    case 'short':
      return 2
    case 'long':
      return 4
    case 'medium':
    default:
      return 3
  }
}

export function generateStory(request: StoryRequest): GeneratedStory {
  const rng = mulberry32(Date.now() ^ Math.floor(request.creativity * 1_000_003))
  const theme = THEME_WORDS[request.theme]
  const place = PLACE_WORDS[request.place]
  const periodLine = pick(PERIOD_WORDS[request.period], rng)
  const placeDetail = pick(place.detail, rng)
  const obstacle = pick(OBSTACLES, rng)
  const twist = request.creativity >= 0.5 ? pick(TWISTS_HIGH, rng) : pick(TWISTS_LOW, rng)
  const moral = pick(MORALS, rng)
  const voice = ageVoice(request.ageRange)
  const hero = request.hero.trim() || 'our hero'
  const friend = request.friend.trim() || 'a new friend'
  const beats = lengthToBeats(request.storyLength)

  const paragraphs: string[] = []

  paragraphs.push(
    voice.flourish(
      `${periodLine[0].toUpperCase()}${periodLine.slice(1)}, ${hero} lived at the edge of ${place.name}, ${placeDetail}. ` +
        `The air felt ${theme.mood}, and somewhere nearby, ${theme.sparkle} caught the light like tiny lanterns.`,
    ),
  )

  paragraphs.push(
    voice.flourish(
      `One day, ${hero} met ${friend}, and together they noticed something the rest of the town had missed: ${obstacle}. ` +
        `${capitalizeFirst(voice.descriptor(rng))} little ${theme.creature} seemed to be watching them from a distance, as if it already knew how the day would go.`,
    ),
  )

  if (beats >= 3) {
    paragraphs.push(
      voice.flourish(
        `They tried one plan, then another. Nothing quite worked — until ${twist}`,
      ),
    )
  }

  if (beats >= 4) {
    paragraphs.push(
      voice.flourish(
        `With the ${theme.creature} leading the way, ${hero} and ${friend} followed the trail it left behind, ` +
          `past ${placeDetail}, until the path opened into somewhere neither of them expected.`,
      ),
    )
  }

  const closingExtra = request.additionalRequest.trim()
    ? ` And because ${hero} had asked for it specially, the day even made room for this: ${request.additionalRequest.trim()}.`
    : ''

  paragraphs.push(
    voice.flourish(
      `By the time the sky began to change, ${hero} and ${friend} had learned ${moral}. ` +
        `They walked home together, already turning the story into one they'd tell again.${closingExtra}`,
    ),
  )

  const title = `${hero} and ${place.titleName}`

  return {
    id: `${Date.now()}-${Math.floor(rng() * 1e6)}`,
    title,
    paragraphs,
    request,
    createdAt: Date.now(),
  }
}

/** Capitalizes only the first letter — used mid-sentence, e.g. "a curious fox". */
function capitalizeFirst(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
