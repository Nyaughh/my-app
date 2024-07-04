"use client"

import { WiredVideo, WiredCard} from "react-wired-elements";
import * as React from 'react'
import { animated, useSpring } from '@react-spring/web'
import './styles.css'

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
          <WiredVideo className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" loop src="ham.mp4"></WiredVideo>

          <wired-card fill="black">
  <p>Happy Birthday Zafkiel From Alen</p>
</wired-card>

<wired-card fill="black">
  <p>Happy Birthday Zafkiel From Itoko</p>
</wired-card>

        </animated.div>
      </div>
    </div>
  )
}

