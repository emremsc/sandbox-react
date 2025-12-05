'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react'

export function HeaderPlay() {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const childRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  const SPRING = {
    stiffness: 200,
    damping: 20,
    mass: 2,
  }

  const y = useSpring(position.top, SPRING)
  const velocity = useMotionValue(0)

  useEffect(() => {
    return y.on('change', () => {
      velocity.set(y.getVelocity())
    })
  }, [y, velocity])

  const scaleY = useTransform(velocity, (v) => {
    const squash = Math.min(Math.abs(v) / 10000, 0.2)
    return 1 - squash
  })

  const scaleX = useTransform(velocity, (v) => {
    const squash = Math.min(Math.abs(v) / 10000, 0.2)
    return 1 + squash
  })

  useEffect(() => {
    function updatePosition() {
      if (!childRef.current || !parentRef.current) return

      const childRect = childRef.current.getBoundingClientRect()
      const parentRect = parentRef.current.getBoundingClientRect()

      setPosition({
        top: childRect.top - parentRect.top,
        left: childRect.left - parentRect.left,
      })
    }

    updatePosition()

    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [childRef, parentRef])

  useEffect(() => {
    y.set(position.top)
  }, [position.top, y])

  return (
    <div ref={parentRef} className='w-screen h-[6000px] flex flex-col relative'>
      <div ref={childRef} className='ghost w-1 h-1 fixed top-12 -translate-x-1/2 left-1/2 '></div>
      <motion.div style={{ top: y, scaleY, scaleX, borderRadius: '16px' }} className='real w-xs h-12 bg-black -translate-x-1/2 left-1/2 absolute'></motion.div>
    </div>
  )
}
