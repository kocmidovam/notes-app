import { useEffect, useRef, useState } from "react"

export const useOverflowScreenBotom = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const calculateOverflow = () => {
    if (ref.current) {
      const { bottom } = ref.current.getBoundingClientRect()
      const innerHeight = window.innerHeight || document.documentElement.clientHeight
      setIsOverflowing(bottom > innerHeight)
    }
  }

  useEffect(() => {
    calculateOverflow()
  }, [])

  return { ref, isOverflowing }
}
