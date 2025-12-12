import './App.css'
import { BouncyNav } from './components/BouncyNav/BouncyNav'
import ConfirmButton from './components/ConfirmButton/ConfirmButton'
import CoveConnect from './components/CoveConnect/CoveConnect'
import CoveLineChart from './components/CoveLineChart/CoveLineChart'
import CoveNavbar from './components/CoveNavbar/CoveNavbar'
import Cursor from './components/Cursor/Cursor'
import HeroText from './components/HeroText/HeroText'
import PerspectiveTunnel from './components/PerspectiveTunnel/PerspectiveTunnel'
import Sketch from './components/Sketch/Sketch'
import UnderConstruction from './components/UnderConstruction/UnderConstruction'

export default function App() {
  return (
    <main className='w-full h-auto flex flex-col items-center justify-center'>
      <div className='w-full h-screen grid place-items-center bg-white'><HeroText text='lorem ipsum dolor sit amet?' /></div>
      <div className='w-full h-screen grid place-items-center bg-black'><UnderConstruction /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><Sketch /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><PerspectiveTunnel /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><Cursor /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><CoveNavbar /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><CoveLineChart /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><CoveConnect /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><ConfirmButton /></div>
      <div className='w-full h-screen grid place-items-center bg-white'><BouncyNav /></div>
    </main>
  )
}