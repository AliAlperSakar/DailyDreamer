import type { FeedbackRecord } from '../types'

const STORAGE_KEY = 'dreamytales.feedback.v2'

/**
 * The original app POSTed likes/dislikes/comments to a Flask endpoint that
 * appended them to feedback.csv on the server. A static GitHub Pages site
 * has no server, so v2 keeps feedback locally in the visitor's own browser
 * instead. It's a demo, not a growth database — this is an intentional
 * trade-off, not a missing feature.
 */
function readAll(): FeedbackRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(records: FeedbackRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch {
    // localStorage can be unavailable (private browsing, quota) — fail silently.
  }
}

export function saveFeedback(record: FeedbackRecord) {
  const all = readAll().filter((r) => r.storyId !== record.storyId)
  all.push(record)
  writeAll(all)
}

export function getFeedback(storyId: string): FeedbackRecord | undefined {
  return readAll().find((r) => r.storyId === storyId)
}
