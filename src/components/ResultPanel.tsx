import { useEffect, useState } from 'react'
import type { GeneratedStory } from '../types'
import { getFeedback, saveFeedback } from '../lib/feedback'

interface Props {
  story: GeneratedStory
  onGenerateAnother: () => void
}

export function ResultPanel({ story, onGenerateAnother }: Props) {
  const [liked, setLiked] = useState<boolean | null>(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const existing = getFeedback(story.id)
    setLiked(existing?.liked ?? null)
    setComment(existing?.comment ?? '')
    setSubmitted(false)
  }, [story.id])

  function setLike(value: boolean) {
    setLiked(value)
    saveFeedback({ storyId: story.id, liked: value, comment, createdAt: Date.now() })
  }

  function submitComment() {
    saveFeedback({ storyId: story.id, liked, comment, createdAt: Date.now() })
    setSubmitted(true)
  }

  return (
    <section className="result" aria-label="Generated story">
      <h2 className="result__title">{story.title}</h2>
      <div className="result__body">
        {story.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="result__actions">
        <button
          type="button"
          className={`btn btn--like${liked === true ? ' is-active' : ''}`}
          onClick={() => setLike(true)}
        >
          👍 Like
        </button>
        <button
          type="button"
          className={`btn btn--dislike${liked === false ? ' is-active' : ''}`}
          onClick={() => setLike(false)}
        >
          👎 Dislike
        </button>
        <button type="button" className="btn btn--secondary" onClick={onGenerateAnother}>
          ✨ Generate another
        </button>
      </div>

      <div className="comment-block">
        <h3>Leave a comment</h3>
        <textarea
          rows={3}
          cols={50}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think?"
        />
        <div style={{ marginTop: 8 }}>
          <button type="button" className="btn btn--secondary" onClick={submitComment}>
            Submit comment
          </button>
        </div>
        {submitted && <p className="comment-block__thanks">Thanks for the feedback!</p>}
      </div>
    </section>
  )
}
