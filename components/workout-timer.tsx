"use client"

import { useState, useEffect, useRef } from "react"

type WorkoutTimerProps = {
  isRunning: boolean
  onTimeUpdate: (seconds: number) => void
}

export function WorkoutTimer({ isRunning, onTimeUpdate }: WorkoutTimerProps) {
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const secondsRef = useRef(seconds)

  // Keep the ref updated with the latest seconds value
  useEffect(() => {
    secondsRef.current = seconds
    // Call onTimeUpdate outside of the render cycle
    onTimeUpdate(seconds)
  }, [seconds, onTimeUpdate])

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return <div className="text-xl font-mono font-bold">{formatTime(seconds)}</div>
}
