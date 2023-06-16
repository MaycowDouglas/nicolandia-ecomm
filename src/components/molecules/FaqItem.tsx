import { MouseEventHandler } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

type FaqItemProps = {
  show?: boolean
  awnser: string | string[]
  onClick: MouseEventHandler<HTMLButtonElement>
  question: string
}

export default function FaqItem({ question, awnser, onClick, show = false }: FaqItemProps) {
  return (
    <div className="relative overflow-hidden">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 border-2 border-dark-10 ${
          show ? 'text-red' : 'text-custom-600'
        } text-left font-bold text-lg md:text-2xl leading-5`}
      >
        <span className="w-11/12">{question}</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <div className="p-4 bg-gray-100 border-x-2 border-dark-10 md:text-lg shadow-inner">
          {typeof awnser === 'string' ? (
            <p>{awnser}</p>
          ) : (
            awnser.map((a, index) => (
              <p key={index} className="mb-4">
                {a}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  )
}
