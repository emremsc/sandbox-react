'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import iphone from '/public/iPhone 16 Pro - Black Titanium - Portrait.png'
import homeindicator from '/public/Home Indicator.png'
import statusbar from '/public/Status Bar.png'
import contents from '/public/Contents.png'
import { motion, AnimatePresence } from 'motion/react'

export default function CoveNavbar() {
    const [isPlusOpen, setIsPlusOpen] = useState(false)

    const toggleIsPlusOpen = () => {
        if (isPlusOpen) {
            setIsPlusOpen(false)
        } else {
            setIsPlusOpen(true)
        }
    }

    const revealTime = {
        hidden: { filter: 'blur(4px)', opacity: 0 },
        visible: { filter: 'blur(0px)', opacity: 1 },
        transition: { duration: 0.3, ease: 'easeOut' },
    }
    const springTime = {
        transition: { duration: 0.4, bounce: 0.2, type: 'spring' },
    }

    return (
        <div className="static">
            <Image alt="" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-13" src={iphone} />
            <div className="relative w-[402px] h-[874px]">
                <Image alt="" priority src={statusbar} className="absolute top-0 z-13" />
                <Image alt="" priority src={homeindicator} className="absolute bottom-0 z-13" />
                <Image alt="" priority src={contents} className="absolute bottom-0 z-12" />
                <div className="w-full h-full  flex flex-col overflow-hidden rounded-[44px] items-center justify-start">
                    <div className="absolute bottom-[37px] w-full  h-full px-4 flex items-end">
                        <div className=" w-full flex gap-4 justify-center ">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {!isPlusOpen ? (
                                    <motion.div
                                        key="nav"
                                        variants={revealTime}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={revealTime.transition}
                                        className="px-1 rounded-full flex w-fit bg-[#1D2020]/80 backdrop-blur-2xl z-12">
                                        <button className="w-14 rounded-full h-14 grid place-items-center">
                                            <Home />
                                        </button>
                                        <button className="w-14 rounded-full h-14 grid place-items-center">
                                            <Token />
                                        </button>
                                        <button className="w-14 rounded-full h-14 grid place-items-center">
                                            <Discover />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="fixed inset-0 bg-black/50 z-12 backdrop-blur-xs"></motion.div>
                                )}
                            </AnimatePresence>
                            <motion.div
                                style={{
                                    borderRadius: '32px',
                                    width: isPlusOpen ? '100%' : '56px',
                                    height: isPlusOpen ? '100%' : '56px',
                                }}
                                layout
                                transition={springTime.transition}
                                onClick={() => toggleIsPlusOpen()}
                                className=" bg-[#1D2020]/80 mix-blend-screen backdrop-blur-2xl z-13">
                                <AnimatePresence initial={false} mode="popLayout">
                                    {isPlusOpen ? (
                                        <motion.div
                                            layoutId="opencontainer"
                                            key="openplus"
                                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                                            transition={springTime.transition}
                                            className="w-full h-fit p-6 gap-6 flex flex-col cursor-default items-center justify-center">
                                            <motion.div
                                                initial={{ scale: 0.2 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0.2 }}
                                                transition={springTime.transition}
                                                className="w-full h-fit flex items-center justify-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#B5B9BA]/8 shrink-0 grid place-items-center">
                                                    <Receive />
                                                </div>
                                                <div className="flex flex-col w-full h-fit">
                                                    <span className="text-base leading-[24px] text-[#EAEBEB]">Receive</span>
                                                    <span className="text-[12px] leading-[16px] text-[#EAEBEB]/40">Get crypto by sharing your address.</span>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                initial={{ scale: 0.4 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0.4 }}
                                                transition={springTime.transition}
                                                className="w-full h-fit flex items-center justify-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#B5B9BA]/8 shrink-0 grid place-items-center">
                                                    <span className="mr-0.5 mt-0.5">
                                                        <Send />
                                                    </span>
                                                </div>
                                                <div className="flex flex-col w-full h-fit">
                                                    <span className="text-base leading-[24px] text-[#EAEBEB]">Send</span>
                                                    <span className="text-[12px] leading-[16px] text-[#EAEBEB]/40">Transfer crypto to another address.</span>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                initial={{ scale: 0.6 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0.6 }}
                                                transition={springTime.transition}
                                                className="w-full h-fit flex items-center justify-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#B5B9BA]/8 shrink-0 grid place-items-center">
                                                    <Buy />
                                                </div>
                                                <div className="flex flex-col w-full h-fit">
                                                    <span className="text-base leading-[24px] text-[#EAEBEB]">Buy</span>
                                                    <span className="text-[12px] leading-[16px] text-[#EAEBEB]/40">Purchase using your preferred methods.</span>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0.8 }}
                                                transition={springTime.transition}
                                                className="w-full h-fit flex items-center justify-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#B5B9BA]/8 shrink-0 grid place-items-center">
                                                    <Swap />
                                                </div>
                                                <div className="flex flex-col w-full h-fit">
                                                    <span className="text-base leading-[24px] text-[#EAEBEB]">Swap</span>
                                                    <span className="text-[12px] leading-[16px] text-[#EAEBEB]/40">
                                                        Exchange one cryptocurrency for another.
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            layoutId="opencontainer"
                                            key="closedplus"
                                            transition={springTime.transition}
                                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                                            className="w-full h-full flex flex-col items-center justify-center">
                                            <Plus />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//#region icons
const Plus: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="#EAEBEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v14M5 12h14"></path>
    </svg>
)

const Token: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
            stroke="#EAEBEB"
            opacity={0.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.102 4A7 7 0 0 1 20 13.899M9 22A7 7 0 1 0 9 8a7 7 0 0 0 0 14"></path>
    </svg>
)

const Discover: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
            stroke="#EAEBEB"
            opacity={0.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"></path>
        <path
            opacity={0.4}
            stroke="#EAEBEB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M14.724 8.266c.488-.163.733-.244.895-.186a.5.5 0 0 1 .303.303c.058.162-.023.406-.186.895l-1.488 4.463c-.046.139-.07.208-.109.266a.5.5 0 0 1-.13.13c-.058.04-.128.063-.267.11L9.28 15.734c-.489.163-.733.244-.896.186a.5.5 0 0 1-.303-.303c-.058-.162.024-.406.187-.895l1.487-4.462c.047-.14.07-.21.11-.267a.5.5 0 0 1 .13-.13c.058-.04.127-.063.266-.11z"></path>
    </svg>
)

const Home: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
            fill="#EAEBEB"
            d="M11.87 2.15a.5.5 0 0 1 .26 0c.098.027.186.096.361.232l8.2 6.377c.114.088.17.132.211.188a.5.5 0 0 1 .08.163c.018.066.018.137.018.28V20.2c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.219c-.107.054-.247.053-.527.053H3.8c-.28 0-.42 0-.527-.053a.5.5 0 0 1-.218-.22C3 20.62 3 20.48 3 20.2V9.39c0-.143 0-.214.019-.28a.5.5 0 0 1 .079-.163c.04-.056.097-.1.21-.188l8.2-6.377c.176-.136.264-.205.361-.231M8 16.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5z"></path>
        <path
            fill="#EAEBEB"
            fillRule="evenodd"
            d="M11.674 1.427a1.25 1.25 0 0 1 .653 0c.252.068.46.234.588.334l.037.03 8.2 6.377.024.018c.084.065.224.172.33.315q.136.185.198.407c.048.17.047.347.046.453v10.86c0 .122 0 .254-.009.369a1.3 1.3 0 0 1-.127.478 1.25 1.25 0 0 1-.546.546c-.177.09-.349.116-.478.127-.115.01-.247.01-.37.01H3.78c-.122 0-.255 0-.37-.01a1.3 1.3 0 0 1-.477-.127 1.25 1.25 0 0 1-.546-.546 1.3 1.3 0 0 1-.127-.478 5 5 0 0 1-.01-.37V9.361c0-.106-.001-.282.047-.453a1.3 1.3 0 0 1 .198-.407c.106-.143.245-.25.33-.315l.024-.018 8.2-6.378.037-.029c.127-.1.336-.266.588-.334M12 2.95l-.03.024-8.2 6.378-.02.015V20.25h16.5V9.366l-.019-.015-8.2-6.378z"
            clipRule="evenodd"></path>
    </svg>
)

const Receive: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="#EAEBEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16M18 14l-6 6-6-6"></path>
    </svg>
)

const Swap: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
            stroke="#EAEBEB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M14 22s.85-.121 4.364-3.636A9 9 0 0 0 14 3.224M10 2s-.85.122-4.364 3.636A9 9 0 0 0 10 20.776"></path>
        <path stroke="#EAEBEB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 2h6v6M20 22h-6v-6"></path>
    </svg>
)

const Buy: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
            fill="#EAEBEB"
            fillRule="evenodd"
            d="M4.717 2.25h14.566c.113 0 .237 0 .345.008.123.01.284.034.452.114.225.108.413.281.54.497.093.16.13.318.15.44.018.107.028.23.037.343l1.37 16.44c.011.132.023.273.023.395 0 .137-.013.321-.098.515a1.25 1.25 0 0 1-.55.597c-.186.1-.368.13-.505.14-.121.011-.263.011-.395.011H3.348c-.132 0-.273 0-.395-.01a1.3 1.3 0 0 1-.504-.14 1.25 1.25 0 0 1-.55-.598 1.3 1.3 0 0 1-.098-.515c0-.122.011-.263.022-.394L3.192 3.67l.001-.019c.01-.112.02-.236.038-.343.02-.122.057-.28.15-.44a1.25 1.25 0 0 1 .54-.497c.168-.08.329-.104.452-.114.108-.008.231-.008.344-.008m-.026 1.5-.004.046-1.367 16.4-.004.054h17.369l-.004-.054-1.367-16.4-.004-.046H4.691"
            clipRule="evenodd"></path>
        <path
            fill="#EAEBEB"
            d="M19.265 3c.259 0 .389 0 .491.049a.5.5 0 0 1 .216.198c.057.098.068.228.09.486l1.366 16.4c.025.301.038.452-.013.568a.5.5 0 0 1-.22.238c-.11.06-.262.061-.564.061H3.371c-.303 0-.454 0-.565-.06a.5.5 0 0 1-.22-.239c-.05-.116-.039-.267-.014-.567l1.368-16.4c.021-.26.032-.389.09-.487a.5.5 0 0 1 .215-.198C4.348 3 4.477 3 4.736 3zM16 7.25a.75.75 0 0 0-.75.75 3.25 3.25 0 0 1-6.5 0 .75.75 0 1 0-1.5 0 4.75 4.75 0 0 0 9.5 0 .75.75 0 0 0-.75-.75"></path>
    </svg>
)

const Send: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
            fill="#EAEBEB"
            d="M20.719 1.714c.176-.051.48-.126.799-.02.372.125.664.418.789.79.106.318.031.622-.02.798a9 9 0 0 1-.24.661L15.436 20.89c-.106.272-.203.521-.296.71-.084.17-.245.468-.56.632a1.25 1.25 0 0 1-1.154 0c-.316-.164-.475-.463-.559-.632-.093-.19-.19-.44-.297-.712l-2.351-6.045 1.159-1.16 2.579 6.632.047.12.047-.12 6.59-16.887.04-.107-.105.042-16.888 6.59-.12.047.12.046 6.628 2.578-1.158 1.158-6.043-2.35c-.272-.105-.521-.202-.71-.295-.17-.084-.469-.243-.634-.559a1.25 1.25 0 0 1 0-1.154c.164-.316.462-.476.631-.56.19-.093.44-.19.712-.297l16.945-6.613c.244-.095.472-.184.66-.24"></path>
        <path
            fill="#EAEBEB"
            d="M21.28 2.406a.5.5 0 0 1 .316.315c.057.172-.049.44-.258.978l-6.59 16.888c-.232.595-.349.892-.516.979a.5.5 0 0 1-.46 0c-.168-.087-.284-.385-.515-.98l-2.46-6.325L17.53 7.53a.75.75 0 0 0-1.06-1.06l-6.734 6.732-6.321-2.458c-.595-.232-.893-.347-.98-.514a.5.5 0 0 1 0-.462c.087-.166.385-.283.979-.514l16.889-6.591c.536-.21.805-.314.976-.257"></path>
    </svg>
)

//#endregion icons
