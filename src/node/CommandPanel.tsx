import { useEffect, useState } from "react"
import type { NodeType } from "../utils/types"
import { useOverflowScreenBotom } from "./useOverflowScreenBotom"
import styles from "./commandPanel.module.css"
import cx from "classnames"

type CommandPanelProps = {
  nodeText: string
  selectItem: (nodeType: NodeType) => void
}

type SupportedNodeType = {
  value: NodeType
  name: string
}

const supportedNodeTypes: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading 3" },
]

export const CommandPanel = ({ nodeText, selectItem }: CommandPanelProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const { ref, isOverflowing } = useOverflowScreenBotom()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        selectItem(supportedNodeTypes[selectedItemIndex].value)
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectItem, selectedItemIndex])

  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, "")
    setSelectedItemIndex(supportedNodeTypes.findIndex((item) => item.value.match(normalizedValue)))
  }, [nodeText])

  return (
    <div
      ref={ref}
      className={cx(styles.panel, {
        [styles.reverse]: isOverflowing,
      })}>
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index

          return (
            <li
              key={type.value}
              className={cx({
                [styles.selected]: selected,
              })}
              onClick={() => selectItem(type.value)}>
              {type.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
