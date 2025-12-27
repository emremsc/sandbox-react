'use client'

import { useEffect, useState, useRef } from 'react'

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const [hasPointer, setHasPointer] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches)

  useEffect(() => {
    if (!hasPointer) return

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const INTERACTIVE_SELECTOR = 'a, button, .interactive'

    const handleInteractiveElements = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = Boolean(target.closest(INTERACTIVE_SELECTOR))

      setHover((prev) => (prev !== isInteractive ? isInteractive : prev))
    }

    const handleMouseOut = () => setHover(false)

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', handleInteractiveElements, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleInteractiveElements)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [hasPointer])

  if (!hasPointer) {
    return null
  }

  return (
    <div
      className='relative pointer-events-none top-0 left-0 z-50 rounded-full bg-black/30 backdrop-blur-sm'
      style={{
        height: hover ? '1rem' : '2rem',
        width: hover ? '1rem' : '2rem',
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        transition: 'width 0.3s ease-out, height 0.3s ease-out',
      }}
    />
  )
}

//NOTES
// const ref = useRef(null);

// function onMouseMove(e) {
//   ref.current.style.translate = `${e.clientX}px ${e.clientY}px`;
// }

// <div onMouseMove={onMouseMove}>
//   <div ref={ref} />
// </div>
