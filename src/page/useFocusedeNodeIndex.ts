import { useEffect, useState } from "react"
import type { NodeData } from "../utils/types"

type useFocusedNodeIndexProps = {
  nodes: NodeData[]
}

export const useFocusedNodeIndex = ({ nodes }: useFocusedNodeIndexProps) => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0)

  useEffect(() => {

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setFocusedNodeIndex((prevIndex) => Math.min(prevIndex + 1, nodes.length - 1))
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        setFocusedNodeIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
    
  }, [nodes.length, focusedNodeIndex])

  return [focusedNodeIndex, setFocusedNodeIndex] as const
}
