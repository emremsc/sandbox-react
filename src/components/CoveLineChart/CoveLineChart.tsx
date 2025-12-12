//
//
//
//
//
//
//
// This file is broken and I'm too lazy to fix it. Do not use it. All you need to now is when the data changes new path gets created and transition effect fires. Inside the transition I'm using d3-interpolate-path algorithm to morph between old and new path.

'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { interpolatePath } from 'd3-interpolate-path'
import Image from 'next/image'
import iphone from '/public/iPhone 16 Pro - Black Titanium - Portrait.png'
import homeindicator from '/public/Home Indicator.png'
import statusbar from '/public/Status Bar.png'
import { BadgeCheck, Star, Ellipsis, Triangle } from 'lucide-react'
import bitcoin from '/public/Bitcoin.svg.png'
import useMeasure from 'react-use-measure'
import { motion, AnimatePresence } from 'motion/react'

const generateRealisticData = (basePrice: number, count: number, volatility: number) => {
    const data = []
    let currentPrice = basePrice

    for (let i = 0; i < count; i++) {
        const change = (Math.random() - 0.48) * volatility * currentPrice
        currentPrice = Math.max(1000, currentPrice + change)

        currentPrice = Math.round(currentPrice * 100) / 100

        data.push(currentPrice)
    }

    return data
}

const createTimestamps = (period: string, count: number) => {
    const now = new Date()
    const timestamps = []

    let interval = 0
    switch (period) {
        case '1h':
            interval = 60 * 1000
            break 
        case '1d':
            interval = 60 * 60 * 1000
            break
        case '1w':
            interval = 6 * 60 * 60 * 1000
            break
        case '1m':
            interval = 24 * 60 * 60 * 1000
            break
        case '1y':
            interval = 7 * 24 * 60 * 60 * 1000
            break
    }

    for (let i = count - 1; i >= 0; i--) {
        timestamps.push(new Date(now.getTime() - i * interval))
    }

    return timestamps
}

const bitcoinData = {
    '1h': (() => {
        const prices = generateRealisticData(49345.67, 60, 0.0005)
        const timestamps = createTimestamps('1h', 60)
        return timestamps.map((date, i) => ({ date, price: prices[i] }))
    })(),

    '1d': (() => {
        const prices = generateRealisticData(56345.67, 24, 0.002)
        const timestamps = createTimestamps('1d', 24)
        return timestamps.map((date, i) => ({ date, price: prices[i] }))
    })(),

    '1w': (() => {
        const prices = generateRealisticData(69823.45, 28, 0.005)
        const timestamps = createTimestamps('1w', 28)
        return timestamps.map((date, i) => ({ date, price: prices[i] }))
    })(),

    '1m': (() => {
        const prices = generateRealisticData(81456.78, 30, 0.01)
        const timestamps = createTimestamps('1m', 30)
        return timestamps.map((date, i) => ({ date, price: prices[i] }))
    })(),

    '1y': (() => {
        const prices = generateRealisticData(88456.78, 52, 0.03) 
        const timestamps = createTimestamps('1y', 52)
        return timestamps.map((date, i) => ({ date, price: prices[i] }))
    })(),
}

type TimeRange = '1h' | '1d' | '1w' | '1m' | '1y'

export default function CoveLineChart() {
    const [timeRange, setTimeRange] = useState<TimeRange>('1d')
    const [currentPrice, setCurrentPrice] = useState<number>(0)
    const [priceChange, setPriceChange] = useState<number>(0)
    const [priceChangePercent, setPriceChangePercent] = useState<number>(0)
    const [containerRef, bounds] = useMeasure()
    const pathRef = useRef<SVGPathElement>(null)
    const isInitializedRef = useRef<boolean>(false)

    const timeRanges: TimeRange[] = ['1h', '1d', '1w', '1m', '1y']
    const margin = { top: 0, right: 0, bottom: 0, left: 0 }
    const dimensions = {
        width: bounds.width || 400,
        height: bounds.height || 300,
    }

    const data = bitcoinData[timeRange]

    const firstPrice = data[0].price
    const lastPrice = data[data.length - 1].price
    const priceDiff = lastPrice - firstPrice
    const percentChange = (priceDiff / firstPrice) * 100
    const isPriceUp = percentChange >= 0

    const [activeTab, setActiveTab] = useState(timeRange)
    const clipContainerRef = useRef<HTMLDivElement>(null)
    const activeTabElementRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setCurrentPrice(lastPrice)
        setPriceChange(priceDiff)
        setPriceChangePercent(percentChange)
    }, [lastPrice, priceDiff, percentChange])

    useEffect(() => {
        if (!pathRef.current || dimensions.width === 0) return

        const path = d3.select(pathRef.current)

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d.date) as [Date, Date])
            .range([margin.left, dimensions.width - margin.right])

        const yScale = d3
            .scaleLinear()
            .domain([
                d3.min(data, (d) => d.price) ? d3.min(data, (d) => d.price)! * 0.99 : 0,
                d3.max(data, (d) => d.price) ? d3.max(data, (d) => d.price)! * 1.01 : 0,
            ])
            .range([dimensions.height - margin.bottom, margin.top])

        const lineGenerator = d3
            .line<{ date: Date; price: number }>()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.price))
            .curve(d3.curveNatural)

        const newPath = lineGenerator(data) || ''

        if (!isInitializedRef.current) {
            path.attr('d', newPath)
            isInitializedRef.current = true
            return
        }

        const currentPath = path.attr('d') || newPath

        path.transition()
            .duration(300)
            .ease(d3.easePolyOut.exponent(2.5))
            .attrTween('d', () => {
                return interpolatePath(currentPath, newPath)
            })
    }, [data, dimensions.width, dimensions.height, margin.bottom, margin.left, margin.right, margin.top])

    useEffect(() => {
        const container = clipContainerRef.current

        if (activeTab && container) {
            const activeTabElement = activeTabElementRef.current

            if (activeTabElement) {
                const { offsetLeft, offsetWidth } = activeTabElement

                const clipLeft = offsetLeft
                const clipRight = offsetLeft + offsetWidth
                container.style.clipPath = `inset(0 ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% 0 ${Number(
                    (clipLeft / container.offsetWidth) * 100
                ).toFixed()}% round 17px)`
            }
        }
    }, [activeTab, activeTabElementRef, clipContainerRef])

    return (
        <div className="static">
            <Image alt="" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src={iphone} />
            <div className="relative w-[402px] h-[874px]">
                <Image alt="" src={statusbar} className="absolute top-0" />
                <Image alt="" src={homeindicator} className="absolute bottom-0" />
                <div className="w-full h-full flex flex-col overflow-hidden rounded-[44px] items-center justify-start">
                    <div className="safe-content w-[402px] h-[775px] gap-6 p-6 pb-0 flex flex-col items-center justify-start absolute top-[62px] text-[#EAEBEB]">
                        <span className="grabber w-[36px] h-[5px] rounded-full bg-[#EBEBF5]/30" />
                        <div className="w-full h-fit gap-12 flex flex-col">
                            <div className="flex flex-col gap-4 items-center">
                                <div className="topbar w-full h-fit flex justify-between items-start">
                                    <div className="bitwrap w-fit h-fit flex gap-2 items-center">
                                        <span className="w-10 h-10 ooverflow-hidden rounded-full ">
                                            <Image alt="" src={bitcoin} className="w-full h-full object-contain" />
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="flex gap-1 items-center">
                                                <span className="text-base leading-[24px] ">Bitcoin</span>
                                                <BadgeCheck size={20} fill="#00BFFF" stroke="#000" />
                                            </span>
                                            <span className="text-[14px] leading-[20px] text-[#EAEBEB]/40">BTC</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Star size={24} fill="#FFB300" stroke="#FFB300" />
                                        <Ellipsis size={24} color="#EAEBEB" opacity={0.4} />
                                    </div>
                                </div>
                                <div className="balance flex justify-between items-end w-full">
                                    <span className="text-[32px] leading-[38px] block">$99,322.22</span>
                                    <AnimatePresence mode="popLayout">
                                        <motion.span
                                            key={currentPrice}
                                            initial={{ y: `${isPriceUp ? '16px' : '-16px'}`, opacity: 0, filter: 'blur(2px)' }}
                                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                            exit={{ y: `${isPriceUp ? '-16px' : '16px'}`, opacity: 0, filter: 'blur(2px)' }}
                                            transition={{ duration: 0.3, bounce: 0.1, type: 'spring' }}
                                            className="flex gap-2 items-center">
                                            {isPriceUp ? (
                                                <Triangle size={8} fill="#06F96B" stroke="#06F96B" className="mt-0.5 block" />
                                            ) : (
                                                <Triangle size={8} fill="#FF2B00" stroke="#FF2B00" className="mt-0.5 rotate-180 block" />
                                            )}
                                            <span className={` ${isPriceUp ? 'text-[#06F96B]' : 'text-[#FF2B00]'} text-[24px] leading-[30px] block`}>
                                                {Math.abs(priceChangePercent).toFixed(2)}%
                                            </span>
                                        </motion.span>
                                    </AnimatePresence>
                                </div>

                                <div ref={containerRef} className="relative chart w-[402px] h-[354px]">
                                    <svg width="100%" height="100%">
                                        <path fill="none" ref={pathRef} stroke={isPriceUp ? '#06F96B' : '#FF2B00'} strokeWidth="2.5" />
                                    </svg>
                                </div>

                                <div className="chartbuttons w-full h-fit gap-4 flex z-10">
                                    <div className="w-full bg-[#1D2020]/80 rounded-full items-center flex px-1">
                                        <div className="chartbuttons-wrapper">
                                            <div className="w-full  rounded-full flex relative">
                                                {timeRanges.map((range) => (
                                                    <button
                                                        key={range}
                                                        ref={activeTab === range ? activeTabElementRef : null}
                                                        data-tab={range}
                                                        onClick={() => {
                                                            setTimeRange(range)
                                                            setActiveTab(range)
                                                        }}
                                                        className="uppercase w-full flex items-center justify-center h-8 text-[14px] leading-[20px] opacity-40">
                                                        {range}
                                                    </button>
                                                ))}
                                            </div>
                                            <div aria-hidden className="clip-path-container" ref={clipContainerRef}>
                                                <div className="w-full bg-[#B5B9BA]/8 rounded-full flex relative">
                                                    {timeRanges.map((range) => (
                                                        <button
                                                            key={range}
                                                            ref={activeTab === range ? activeTabElementRef : null}
                                                            data-tab={range}
                                                            onClick={() => {
                                                                setTimeRange(range)
                                                                setActiveTab(range)
                                                            }}
                                                            className="uppercase w-full flex items-center justify-center h-8 text-[14px] leading-[20px]">
                                                            {range}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="shrink-0 w-10 h-10 rounded-full grid place-items-center bg-[#1D2020]/80">
                                        <StickChart />
                                    </span>
                                </div>
                            </div>
                            <div className="stats w-full h-fit gap-4 flex flex-col">
                                <div className="navbar w-full h-fit flex text-[#EBEBF5]">
                                    <button className="w-full h-8 rounded-full text-[14px] leading-[20px] bg-[#1D2020]/80">Stats</button>
                                    <button className="w-full h-8 rounded-full text-[14px] leading-[20px] opacity-40">History</button>
                                    <button className="w-full h-8 rounded-full text-[14px] leading-[20px] opacity-40">Info</button>
                                </div>
                                <div className="w-full flex flex-col h-fit text-[14px] leading-[20px] opacity-40">
                                    <span className="w-full flex justify-between ">
                                        <span className="flex items-center gap-2">
                                            <SvgIcon2 /> Market Cap
                                        </span>
                                        <span className="w-fit">$1.69T</span>
                                    </span>
                                    <span className="w-full flex justify-between ">
                                        <span className="flex items-center gap-2">
                                            <SvgIcon3 /> FDV
                                        </span>
                                        <span className="w-fit">$1.78T</span>
                                    </span>
                                    <span className="w-full flex justify-between ">
                                        <span className="flex items-center gap-2">
                                            <SvgIcon /> 24h Volume
                                        </span>
                                        <span className="w-fit">$31.94B</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-end">
                        <div className="bg-gradient-to-t from-black from-30% to-transparent w-full h-[200px] rounded-b-[56px]"></div>
                    </div>
                    <div className="button w-full h-fit flex gap-4 px-4 bottom-[37px] absolute">
                        <button className="w-full bg-[#1D2020]/80  rounded-full h-14 backdrop-blur-2xl text-base leading-[24px]">Swap</button>
                        <button className="w-full bg-[#EAEBEB] text-black rounded-full h-14 text-base leading-[24px]">Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

//#region icons

const StickChart: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path
            fill="#EAEBEB"
            fillOpacity="0.4"
            d="M7.836.667c.276 0 .5.213.5.476v1.524l.102.005a1 1 0 0 1 .898.995v6a1 1 0 0 1-.898.995l-.102.005v4.19a.49.49 0 0 1-.5.477.49.49 0 0 1-.5-.477v-4.19l-.102-.005a1 1 0 0 1-.898-.995v-6a1 1 0 0 1 .898-.995l.102-.005V1.143a.49.49 0 0 1 .5-.476M13.43.667c.276 0 .5.213.5.476v4.19l.102.006a1 1 0 0 1 .898.995v6a1 1 0 0 1-.898.994l-.102.006v1.523a.49.49 0 0 1-.5.477.49.49 0 0 1-.5-.477v-1.523l-.102-.006a1 1 0 0 1-.898-.994v-6a1 1 0 0 1 .898-.995l.102-.005v-4.19a.49.49 0 0 1 .5-.477M2.43.667c.276 0 .5.213.5.476v3.524l.102.005a1 1 0 0 1 .898.995v6a1 1 0 0 1-.898.995l-.102.005v2.19a.49.49 0 0 1-.5.477.49.49 0 0 1-.5-.477v-2.19l-.102-.005a1 1 0 0 1-.898-.995v-6a1 1 0 0 1 .898-.995l.102-.005V1.143a.49.49 0 0 1 .5-.476"></path>
    </svg>
)

const SvgIcon: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M3.568 6h.8640000000000001c.252 0 .498 0 .706.017.229.019.499.063.77.201a2 2 0 0 1 .874.874c.138.271.182.541.201.77C7 8.07 7 8.316 7 8.568v10.864c0 .252 0 .498-.017.706a2 2 0 0 1-.201.77 2 2 0 0 1-.874.874 2 2 0 0 1-.77.201C4.93 22 4.684 22 4.432 22h-.864c-.252 0-.498 0-.706-.017a2 2 0 0 1-.77-.201 2 2 0 0 1-.874-.874 2 2 0 0 1-.201-.77C1 19.93 1 19.684 1 19.432V8.568c0-.252 0-.498.017-.706.019-.229.063-.499.201-.77a2 2 0 0 1 .874-.874c.271-.138.541-.182.77-.201C3.07 6 3.316 6 3.568 6M11.568 2h.8640000000000001c.252 0 .498 0 .706.017.229.019.499.063.77.201a2 2 0 0 1 .874.874c.138.271.182.541.201.77.017.208.017.454.017.706v14.864c0 .252 0 .498-.017.706a2 2 0 0 1-.201.77 2 2 0 0 1-.874.874 2 2 0 0 1-.77.201c-.208.017-.454.017-.706.017h-.864c-.252 0-.498 0-.706-.017a2 2 0 0 1-.77-.201 2 2 0 0 1-.874-.874 2 2 0 0 1-.201-.77C9 19.93 9 19.684 9 19.432V4.568c0-.252 0-.498.017-.706.019-.229.063-.499.201-.77a2 2 0 0 1 .874-.874c.271-.138.541-.182.77-.201C11.07 2 11.316 2 11.568 2M19.568 10h.8640000000000001c.252 0 .498 0 .706.017.229.019.499.063.77.201a2 2 0 0 1 .874.874c.138.271.182.541.201.77.017.208.017.454.017.706v6.864c0 .252 0 .498-.017.706a2 2 0 0 1-.201.77 2 2 0 0 1-.874.874 2 2 0 0 1-.77.201c-.208.017-.454.017-.706.017h-.864c-.252 0-.498 0-.706-.017a2 2 0 0 1-.77-.201 2 2 0 0 1-.874-.874 2 2 0 0 1-.201-.77C17 19.93 17 19.684 17 19.432v-6.864c0-.252 0-.498.017-.706a2 2 0 0 1 .201-.77 2 2 0 0 1 .874-.874 2 2 0 0 1 .77-.201c.208-.017.454-.017.706-.017"
            clipRule="evenodd"></path>
    </svg>
)

const SvgIcon2: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path
            fill="#EAEBEB"
            d="M13.595 1.115a11.01 11.01 0 0 1 9.29 9.29c.07.474.104.712.008.957a1.1 1.1 0 0 1-.44.508c-.229.13-.503.13-1.053.13h-7.8c-.56 0-.84 0-1.054-.11a1 1 0 0 1-.437-.436C12 11.24 12 10.96 12 10.4V2.6c0-.55 0-.824.13-1.053.103-.184.311-.364.508-.44.245-.096.483-.061.957.008"></path>
        <path
            fill="#EAEBEB"
            d="M10 3.102c0-.638 0-.957-.163-1.206a1.1 1.1 0 0 0-.618-.43c-.29-.064-.55.032-1.068.226C3.974 3.252 1 7.28 1 12c0 6.075 4.925 11 11 11 4.721 0 8.747-2.974 10.308-7.151.194-.519.29-.778.225-1.068a1.1 1.1 0 0 0-.429-.618C21.855 14 21.536 14 20.898 14h-7.344c-.239 0-.523 0-.774-.02a3 3 0 0 1-1.142-.307 3 3 0 0 1-1.311-1.311 3 3 0 0 1-.307-1.142c-.02-.251-.02-.536-.02-.774z"></path>
    </svg>
)

const SvgIcon3: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path
            fill="#fff"
            fillRule="evenodd"
            d="M3.965 3.084C3.437 3.552 3 4.197 3 5v2c0 .803.437 1.448.965 1.916.53.469 1.238.846 2.027 1.142C7.578 10.653 9.702 11 12 11s4.422-.348 6.008-.942c.79-.296 1.498-.673 2.027-1.142C20.562 8.448 21 7.803 21 7V5c0-.803-.437-1.448-.965-1.916-.53-.469-1.238-.846-2.027-1.142C16.422 1.347 14.298 1 12 1s-4.422.347-6.008.942c-.79.296-1.498.673-2.027 1.142"
            clipRule="evenodd"></path>
        <path
            fill="#fff"
            d="M20.753 10.25a.26.26 0 0 0-.211.113c-.59.836-1.605 1.346-2.534 1.695-1.586.595-3.71.942-6.008.942s-4.422-.348-6.008-.942c-.929-.349-1.943-.859-2.534-1.695a.26.26 0 0 0-.21-.113.247.247 0 0 0-.248.247V13c0 .803.437 1.448.965 1.916.53.469 1.238.846 2.027 1.142C7.578 16.653 9.702 17 12 17s4.422-.348 6.008-.942c.79-.296 1.498-.673 2.027-1.142.527-.468.965-1.113.965-1.916v-2.503a.247.247 0 0 0-.247-.247"></path>
        <path
            fill="#fff"
            d="M20.753 16.25a.26.26 0 0 0-.211.113c-.59.836-1.605 1.346-2.534 1.695-1.586.595-3.71.942-6.008.942s-4.422-.348-6.008-.942c-.929-.349-1.943-.859-2.534-1.695a.26.26 0 0 0-.21-.113.247.247 0 0 0-.248.247V19c0 .803.437 1.448.965 1.916.53.469 1.238.846 2.027 1.142C7.578 22.653 9.702 23 12 23s4.422-.348 6.008-.942c.79-.296 1.498-.673 2.027-1.142.527-.468.965-1.113.965-1.916v-2.503a.247.247 0 0 0-.247-.247"></path>
    </svg>
)

//#endregion
