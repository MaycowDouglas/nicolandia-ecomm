import { FeedbackContext } from '@/types/feedback'
import { createContext } from 'react'

const feedbackContext = createContext<FeedbackContext>({} as FeedbackContext)

export default feedbackContext
