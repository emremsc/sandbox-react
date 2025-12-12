'use client'
import { useState, useEffect, useRef } from 'react'
import { useSpring } from 'motion/react'

export default function PerspectiveTunnel({ squareCount = 16, perspective = 800 }: { squareCount?: number; perspective?: number }) {
    const containerRef = useRef<HTMLDivElement>(null)

    const spring = {
        type: 'spring',
        visualDuration: 0.3,
        bounce: 0,
    }

    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [rotationTime, setRotationTime] = useState(0)

    const squares = Array.from({ length: squareCount }, (_, i) => ({
        zOffset: i * -50,
        index: i,
    }))

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position to -1 to 1 range
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1

            // Update spring values
            x.set(normalizedX)
            y.set(normalizedY)

            setMousePosition({ x: normalizedX, y: normalizedY })
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [x, y])

    // Rotation animation loop
    useEffect(() => {
        const animateRotation = () => {
            setRotationTime(Date.now())
            requestAnimationFrame(animateRotation)
        }

        const animationId = requestAnimationFrame(animateRotation)
        return () => cancelAnimationFrame(animationId)
    }, [])

    const getSquareTransform = (square: { zOffset: number; index: number }): string => {
        // Calculate rotation - each square has a different rotation offset
        const rotationSpeed = 0.0005 // Adjust this to control rotation speed
        const rotationOffset = square.index * 15 // Degrees offset between squares
        const rotation = (rotationTime * rotationSpeed + rotationOffset) % 360

        // Skip movement for the closest square (index 0)
        if (square.index === 0) {
            return `translateZ(${square.zOffset}px) rotateZ(${rotation}deg)`
        }

        // Calculate movement multiplier: further squares move more
        const movementMultiplier = square.index * 0.5

        // Calculate offset based on spring values
        const offsetX = x.get() * 30 * movementMultiplier
        const offsetY = y.get() * 30 * movementMultiplier

        return `translateZ(${square.zOffset}px) translateX(${offsetX}px) translateY(${offsetY}px) rotateZ(${rotation}deg)`
    }

    return (
        <div
            ref={containerRef}
            className="w-screen h-screen bg-black overflow-hidden flex items-center justify-center relative"
            style={{ perspective: `${perspective}px` }}>
            {squares.map((square) => (
                <div
                    key={square.index}
                    className="absolute w-96 h-96 border-2 border-white bg-transparent rounded-[32px]"
                    style={{
                        transform: getSquareTransform(square),
                    }}
                />
            ))}
        </div>
    )
}
