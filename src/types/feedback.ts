export type FeedbackContext = {
  addFeedback: (feedback: FeedbackProps) => void
}

export type FeedbackProps = {
  type?: 'success' | 'error'
  message: string
  text?: string
}
