import Feedback from '@/components/Feedback'
import { FeedbackProps } from '@/types/feedback'
import { ReactNode, useState } from 'react'

import feedbackContext from '.'

type FeedbacksProps = FeedbackProps & {
  id: string
}

export default function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<FeedbacksProps[]>([])

  function addFeedback({ message, type = 'success', duration = 3000 }: FeedbackProps) {
    const id = new Date().toTimeString()

    setFeedbacks((old) => [
      ...old,
      {
        id,
        type,
        message,
      },
    ])

    setTimeout(() => {
      removeFeedback(id)
    }, duration)
  }

  function removeFeedback(id: string) {
    setFeedbacks((old) => old.filter((feedback) => feedback.id !== id))
  }

  return (
    <feedbackContext.Provider value={{ addFeedback }}>
      <div className="relative">
        {children}
        <div className="fixed z-[999] left-0 bottom-10 space-y-5">
          {feedbacks.map((data) => (
            <Feedback key={data.id} message={data.message} type={data.type} />
          ))}
        </div>
      </div>
    </feedbackContext.Provider>
  )
}
