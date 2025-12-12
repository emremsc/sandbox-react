'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import styles from './ConfirmButton.module.css'

export default function ConfirmButton() {
    const [buttonState, setButtonState] = useState('default')
    const outlineRef = useRef<SVGRectElement>(null)
    const [pathLength, setPathLength] = useState(200)

    useEffect(() => {
        if (outlineRef.current) {
            const length = outlineRef.current.getTotalLength()
            document.documentElement.style.setProperty('--path-total-length', length.toString())
            setPathLength(length)
        }
    }, [])

    function confirm() {
        setButtonState('confirming')
        setTimeout(() => {
            setButtonState('confirmed')
        }, 2000)

        setTimeout(() => {
            setButtonState('default')
        }, 4000)
    }

    return (
        <>
            <AnimatePresence initial={false} mode="wait">
                {buttonState === 'default' && (
                    <motion.button
                        style={{ borderRadius: '32px' }}
                        layoutId="btn"
                        onClick={confirm}
                        key={buttonState}
                        className="relative h-8  px-4 bg-[#06F96B] flex items-center justify-center cursor-pointer">
                        <motion.span
                            initial={{ y: 30, opacity: 0.5, filter: 'blur(4px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: -30, opacity: 0.5, filter: 'blur(4px)' }}
                            transition={{ duration: 0.2, bounce: 0.2, type: 'spring' }}
                            layout="position"
                            className="text-sm text-white block">
                            Confirm
                        </motion.span>
                        <motion.div exit={{ opacity: 0, scale: 1.4 }} className={` ${styles.outliner} absolute inset-0 rounded-full`} />
                    </motion.button>
                )}
                {buttonState === 'confirming' && (
                    <motion.button
                        style={{ borderRadius: '32px' }}
                        layoutId="btn"
                        key={buttonState}
                        className="relative h-8 flex items-center justify-center  px-4 bg-[#06F96B]">
                        <motion.span
                            initial={{ y: 30, opacity: 0.5, filter: 'blur(4px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: -30, opacity: 0.5, filter: 'blur(4px)' }}
                            transition={{ duration: 0.2, bounce: 0.2, type: 'spring' }}
                            layout="position"
                            className="text-sm text-white block">
                            Confirming
                        </motion.span>

                        <motion.div
                            className="absolute inset-0"
                            exit={{ opacity: 0, scale: 1.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}>
                            <svg
                                key={buttonState}
                                style={{ left: '-6px', top: '-6px', width: 'calc(100% + 12px)', height: 'calc(100% + 12px)' }}
                                className="absolute overflow-visible">
                                <motion.rect
                                    ref={outlineRef}
                                    rx="22"
                                    ry="22"
                                    fill="none"
                                    stroke="rgba(6,249,107,1)"
                                    strokeWidth="2"
                                    strokeDasharray="6 4"
                                    animate={{
                                        strokeDashoffset: [pathLength, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: 'linear',
                                        repeat: Infinity,
                                    }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </svg>
                        </motion.div>
                    </motion.button>
                )}
                {buttonState === 'confirmed' && (
                    <motion.button
                        style={{ borderRadius: '32px' }}
                        layoutId="btn"
                        key={buttonState}
                        className={`${styles.pingo} h-8 flex items-center justify-center  px-4 bg-[#06F96B] `}>
                        <motion.span
                            initial={{ y: 30, opacity: 0.5, filter: 'blur(4px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: -30, opacity: 0.5, filter: 'blur(4px)' }}
                            transition={{ duration: 0.2, bounce: 0.2, type: 'spring' }}
                            layout="position"
                            className="text-sm text-white flex gap-1 items-center relative">
                            <span>Confirmed</span>
                            <motion.svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white mt-0.5">
                                <motion.path
                                    d="M3 7.5L6 10.5L11 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
                                />
                            </motion.svg>
                        </motion.span>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    )
}
