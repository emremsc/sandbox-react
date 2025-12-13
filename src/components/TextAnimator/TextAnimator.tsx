import styles from './TextAnimator.module.css'
import React, { useRef } from 'react'
import { useInView } from 'motion/react'

interface TextAnimatorProps {
  text: string
  className?: string
  mode: 'word' | 'char'
}

export default function TextAnimator({ text, className, mode }: TextAnimatorProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')
  let charCount = 0

  return (
    <span ref={ref} className={`${styles.text} ${className}`}>
      {isInView &&
        words.map((word, i) => {
          const startIndex = mode === 'word' ? i * 10 : charCount
          charCount += word.length + 1

          return (
            <span key={`word-${i}`} className='inline-block whitespace-nowrap'>
              {[...word].map((char, charIndex) => (
                <span key={`char-${charIndex}`} className='inline-block' style={{ '--index': startIndex + charIndex } as React.CSSProperties}>
                  {char}
                </span>
              ))}
              {i < words.length - 1 && (
                <span className='inline-block' style={{ '--index': startIndex + word.length } as React.CSSProperties}>
                  &nbsp;
                </span>
              )}
            </span>
          )
        })}
    </span>
  )
}
