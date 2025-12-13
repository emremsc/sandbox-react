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
    <main className='w-full h-auto flex flex-col items-center justify-center gap-4 py-4 bg-gray-100'>
      <div className='p-4'>
        <span>
          React components by <a href='https://emrems.me'>Emre</a>. <a href='https://github.com/emremsc/sandbox-react'>Source (Github)</a>
        </span>
      </div>
      <div className='w-7xl h-auto aspect-video grid place-items-center bg-white rounded-sm'>
        <HeroText text='lorem ipsum dolor sit amet ?' className='text-3xl' mode='word' />
      </div>
      <div className='w-7xl h-auto aspect-video grid place-items-center bg-white rounded-sm'>
        <UnderConstruction />
      </div>
      <div className='w-7xl h-auto aspect-video grid place-items-center bg-white rounded-sm p-20'>
        <Draw />
      </div>
      <div className='w-7xl h-auto aspect-video grid place-items-center bg-white rounded-sm'>
        <PerspectiveTunnel />
      </div>
      <div className='w-7xl h-auto aspect-video grid place-items-center bg-white rounded-sm overflow-hidden'>
        <Cursor />
      </div>
      <div className='w-full h-screen grid place-items-center bg-white rounded-sm border border-black/10'>
        <ConfirmButton />
      </div>
      <div className='w-full h-screen grid place-items-center bg-white rounded-sm border border-black/10'>
        <BouncyNav />
      </div>
      <div className='p-4 gap-2 flex flex-col items-center'>
        <span>Back To Top</span>
        <span>© 2025</span>
      </div>
    </main>
  )
}
