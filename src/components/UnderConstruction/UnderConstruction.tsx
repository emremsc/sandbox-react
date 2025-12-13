import { Hammer } from 'lucide-react'
import { useRef, useEffect } from 'react'
import styles from './UnderConstruction.module.css'

export default function UnderConstruction() {
  const rectRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    if (rectRef.current) {
      const length = rectRef.current.getTotalLength()
      document.documentElement.style.setProperty('--path-total-length', length.toString())
    }
  }, [])
  return (
    <div className='grid w-md aspect-video place-items-center'>
      <div className='relative size-full flex flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl'>
        <Hammer size={24} strokeWidth={1.5} className={`${styles.hammer}  text-neutral-300`} />
        <h1 className='text-md text-neutral-300 uppercase'>Under Construction</h1>
        <svg className='absolute size-full'>
          <rect ref={rectRef} className={`${styles.rect} size-full`} rx='24' ry='24' fill='none' stroke='rgba(0,0,0,0.1)' strokeWidth='4' />
        </svg>
      </div>
    </div>
  )
}
