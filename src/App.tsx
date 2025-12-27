import './App.css'
import { BouncyNav } from './components/BouncyNav/BouncyNav'
import ConfirmButton from './components/ConfirmButton/ConfirmButton'
import Cursor from './components/Cursor/Cursor'
import HeroText from './components/TextAnimator/TextAnimator'
import PerspectiveTunnel from './components/PerspectiveTunnel/PerspectiveTunnel'
import Draw from './components/Draw/Draw'
import UnderConstruction from './components/UnderConstruction/UnderConstruction'

export default function App() {
  return (
    <main className='w-full h-auto flex flex-col items-center justify-center gap-4 py-4'>
      <header className='p-4 flex gap-8'>
        <span>
          React sketchbook of{' '}
          <a className='text-gray-500 hover:text-black underline-offset-4 underline' href='https://emrems.me'>
            Emre
          </a>
        </span>
        <span>
          <a className='text-gray-500 hover:text-black underline-offset-4 underline' href='https://github.com/emremsc/sandbox-react'>
            Source (Github)
          </a>
        </span>
      </header>
      <section className='w-4/5 h-auto flex flex-col gap-4'>
        <div className='w-full aspect-video grid place-items-center bg-white rounded-sm'>
          <HeroText text='lorem ipsum dolor sit amet ?' className='text-3xl' mode='word' />
        </div>
        <div className='w-full aspect-video grid place-items-center bg-white rounded-sm'>
          <ConfirmButton />
        </div>
        <div className='w-full aspect-video grid place-items-center bg-white rounded-sm'>
          <BouncyNav />
        </div>
        <div className='w-full aspect-video grid place-items-center bg-white rounded-sm'>
          <UnderConstruction />
        </div>
        <div className='w-full aspect-video grid place-items-center bg-white rounded-sm'>
          <div className='w-1/2'>
            <Draw />
          </div>
        </div>
        <div className='w-full aspect-video grid place-items-center bg-white rounded-sm'>
          <PerspectiveTunnel />
        </div>
        <div className='w-full aspect-video grid place-items-center bg-white rounded-sm'>
          <Cursor />
        </div>
      </section>
      <footer className='p-4 gap-2 flex flex-col items-center'>
        <span className='text-2xl font-medium text-gray-500 hover:text-black cursor-pointer' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </span>
        <span>© 2025</span>
      </footer>
    </main>
  )
}
