'use client'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { usePinch } from '@use-gesture/react'

interface Post {
  id: number
}

const posts: Post[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 19 },
  { id: 20 },
]

export default function EveryoneZoom() {
  const [view, setView] = useState<'column' | 'single' | 'full'>('column')
  const [selected, setSelected] = useState<Post | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preventGesture = (e: Event) => e.preventDefault()

    document.addEventListener('gesturestart', preventGesture)
    document.addEventListener('gesturechange', preventGesture)

    return () => {
      document.removeEventListener('gesturestart', preventGesture)
      document.removeEventListener('gesturechange', preventGesture)
    }
  }, [])

  const scrollToSelectedPost = () => {
    const selectedElement = document.querySelector('.selected-post') as HTMLElement
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handlePostClick = (post: Post) => {
    setSelected(post)
    setView('full')
  }

  const handleSingleViewClick = (post: Post) => {
    setSelected(post)
    setView('single')
    // Small delay to allow state update and re-render
    setTimeout(() => {
      scrollToSelectedPost()
    }, 100)
  }

  const bind = usePinch(
    ({ offset: [scale] }) => {
      if (scale < 0.4 && view === 'single') {
        setView('column')
      } else if (scale > 1.6 && view === 'column') {
        setView('single')
      }
    },
    {
      target: containerRef,
    }
  )

  return (
    <section className='w-screen h-svh flex bg-[#f4f5f6] overflow-y-auto snap-y snap-mandatory'>
      <div ref={containerRef} className='w-full h-max flex flex-wrap p-4 gap-1 bg-[#f4f5f6]'>
        <AnimatePresence>
          {view === 'column' &&
            posts.map((post) => (
              <motion.div
                onClick={() => handleSingleViewClick(post)}
                layoutId={`item-${post.id}`}
                key={post.id}
                style={{ borderRadius: '24px' }}
                className='w-[calc(50%-0.25rem)] grow-0 h-full aspect-square bg-white p-4 gap-2 flex flex-col'
              >
                <div className='w-full h-fit flex justify-between'>
                  <div className='flex gap-2 items-center'>
                    <motion.div layoutId={`profile-${post.id}`} className='w-6 h-6 rounded-full block bg-[#f4f5f6]'></motion.div>
                    <motion.span className='block' layoutId={`name-${post.id}`}>
                      Jack
                    </motion.span>
                  </div>
                  <motion.span layoutId={`time-${post.id}`} className='block'>
                    {post.id + 'h'}
                  </motion.span>
                </div>
                <motion.div layoutId={`img-${post.id}`} style={{ borderRadius: '8px' }} className='w-full h-full block bg-[#f4f5f6]'></motion.div>
              </motion.div>
            ))}

          {view === 'single' &&
            posts.map((post) => (
              <motion.div
                onClick={() => handlePostClick(post)}
                layoutId={`item-${post.id}`}
                key={post.id}
                style={{ borderRadius: '24px' }}
                className={`w-full h-full aspect-square bg-white p-4 grow-0 flex flex-col gap-2 snap-center ${selected?.id === post.id ? 'selected-post' : ''}`}
              >
                <div className='w-full h-fit flex justify-between'>
                  <div className='flex gap-2 items-center'>
                    <motion.div layoutId={`profile-${post.id}`} className='w-6 h-6 rounded-full block bg-[#f4f5f6]'></motion.div>
                    <motion.span className='block' layoutId={`name-${post.id}`}>
                      Jack
                    </motion.span>
                  </div>
                  <motion.span layoutId={`time-${post.id}`} className='block'>
                    {post.id + 'h'}
                  </motion.span>
                </div>
                <motion.div layoutId={`img-${post.id}`} style={{ borderRadius: '8px' }} className='w-full h-full block bg-[#f4f5f6]'></motion.div>
              </motion.div>
            ))}

          {view === 'full' && selected && (
            <motion.div layoutId={`item-${selected.id}`} className='bg-white absolute inset-0 flex flex-col p-6 z-10'>
              <div className='w-full h-fit flex justify-between'>
                <div className='flex gap-1 items-center'>
                  <div className='w-6 h-6 rounded-full bg-[#f4f5f6]'></div>
                  <div className='w-10 h-4 rounded-full bg-[#f4f5f6]'></div>
                </div>
                <div className='flex gap-1 items-center'>
                  <div className='w-10 h-4 rounded-full bg-[#f4f5f6]'></div>
                  <div className=''>{selected.id}</div>
                </div>
              </div>
              <div style={{ borderRadius: '8px' }} className='w-full h-full flex bg-[#f4f5f6]'></div>
              <button onClick={() => setView('single')} className='absolute top-0 rounded-full px-4 h-12 bg-black text-white'>
                BACK
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
