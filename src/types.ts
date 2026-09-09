export type ThemeId = 'forest' | 'city' | 'underwater'

export type AgeRange = '3-6' | '7-9' | '10-12'

export type PlaceId = 'enhanced_forest' | 'bustling_city' | 'underwater_kingdom' | 'space'

export type PeriodId = 'ancient_times' | 'present_day' | 'future_world'

export type StoryLength = 'short' | 'medium' | 'long'

export interface StoryRequest {
  theme: ThemeId
  ageRange: AgeRange
  place: PlaceId
  period: PeriodId
  hero: string
  friend: string
  storyLength: StoryLength
  creativity: number // 0..1
  additionalRequest: string
}

export interface GeneratedStory {
  id: string
  title: string
  paragraphs: string[]
  request: StoryRequest
  createdAt: number
}

export interface FeedbackRecord {
  storyId: string
  liked: boolean | null
  comment: string
  createdAt: number
}
