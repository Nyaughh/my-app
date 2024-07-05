"use client"

import * as React from 'react'
import { animated, useSpring } from '@react-spring/web'
import './styles.css'
import dynamic from 'next/dynamic'

const WiredCard =  dynamic(() => import('wired-elements-react').then((mod) => mod.WiredCard), { ssr: false, loading: () => <div>Loading...</div> })
const WiredVideo =  dynamic(() => import('wired-elements-react').then((mod) => mod.WiredVideo), { ssr: false, loading: () => <div>Loading...</div> })
const X_LINES = 40
const INITIAL_WIDTH = 20

export default function App() {
  const [textStyles, textApi] = useSpring(() => ({
    y: '100%',
  }))

  const [scrollYProgress, setScrollYProgress] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setScrollYProgress((prev) => (prev < 1 ? prev + 0.02 : 1))
    }, 30) // Decreased delay for faster animation

    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    if (scrollYProgress > 0.7) {
      textApi.start({ y: '0' })
    } else {
      textApi.start({ y: '100%' })
    }
  }, [scrollYProgress, textApi])

  React.useEffect(() => {
  }, [])

  return (
    <div className="body">
      <div className="animated__layers">
        <animated.div className="bar__container">
          {Array.from({ length: X_LINES }).map((_, i) => (
            <animated.div
              key={i}
              className="bar"
              style={{
                width: scrollYProgress * (INITIAL_WIDTH / 4 + 40 * Math.cos(((i + 1) / X_LINES - scrollYProgress) * Math.PI / 1.5) ** 32)
              }}
            />
          ))}
        </animated.div>
        <animated.div className="bar__container__inverted">
          {Array.from({ length: X_LINES }).map((_, i) => (
            <animated.div
              key={i}
              className="bar"
              style={{
                width: scrollYProgress * (INITIAL_WIDTH / 4 + 40 * Math.cos((1 - (i + 1) / X_LINES - scrollYProgress) * Math.PI / 1.5) ** 32)
              }}
            />
          ))}
        </animated.div>
        <animated.div
          className="dot"
          style={{
            clipPath: `circle(${scrollYProgress * 100}%)`,
          }}>
          <h1 className="title">
          </h1>
          <div className="flex flex-col items-center justify-start h-full p-5 gap-4">
          <WiredVideo className="w-[400px]" loop src="ham.mp4"></WiredVideo>

          <WiredCard fill="black">
  Happy Birthday Haf. 
</WiredCard>

<WiredCard fill="black">
  <p>Happy Birthday Zafkiel From Itoko</p>
</WiredCard>
</div>
        </animated.div>
      </div> 
    </div>
  )
}

