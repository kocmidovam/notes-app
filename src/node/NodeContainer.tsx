import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { NodeTypeSwitcher } from "./NodeTypeSwitcher"
import type { NodeData } from "../utils/types"
import styles from "./NodeContainer.module.css"

type NodeContainerProps = {
  node: NodeData
  updateFocusedIndex(index: number): void
  isFocused: boolean
  index: number
}

export const NodeContainer = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: node.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={styles.container}>
      <div {...listeners} className={styles.dragHandle}>
        {" "}
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        isFocused={isFocused}
        index={index}
        updateFocusedIndex={updateFocusedIndex}
      />
    </div>
  )
}
