import { classNames } from '@/lib/classNames'
import { FeedbackProps } from '@/types/feedback'
import { useEffect, useRef } from 'react'
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs'

export default function Feedback({ message, type = 'success', text }: FeedbackProps) {
  const toast = useRef<HTMLDivElement>(null)

  const typeTheme = {
    error: {
      icon: <BsExclamationCircle className="text-xl" />,
      customStyle: 'bg-red-500',
    },
    success: {
      icon: <BsCheckCircle className="text-xl" />,
      customStyle: 'bg-green-600',
    },
  }

  useEffect(() => {
    function start() {
      toast.current?.classList.remove('left-0')
      toast.current?.classList.remove('-translate-x-full')
      toast.current?.classList.add('left-10')
    }
    function end() {
      toast.current?.classList.add('left-0')
      toast.current?.classList.add('-translate-x-full')
      toast.current?.classList.remove('left-10')
    }
    start()
    setTimeout(end, 2000)
  }, [message])

  return (
    <div ref={toast} className="px-5 text-white transition-all -translate-x-full duration-500">
      <div
        className={classNames(typeTheme[type].customStyle, 'p-5 rounded-lg shadow-3 font-medium')}
      >
        <p className="inline-flex items-center gap-3">
          {typeTheme[type].icon}
          {message}
        </p>
      </div>
    </div>
  )
}
