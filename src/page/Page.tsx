import { useFocusedNodeIndex } from "./useFocusedeNodeIndex"
import { Cover } from "./Cover"
import { Title } from "./Title"
import { Spacer } from "./Spacer"
import { nanoid } from "nanoid"
import { useAppState } from "../state/AppStateContext"
import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { NodeContainer } from "../node/NodeContainer"

export const Page = () => {
  const { title, nodes, reorderNodes, addNode, cover, setCoverImage, setTitle } = useAppState()
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })
  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event
    if (over?.id && active.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string)
    }
  }

  return (
    <>
      <Cover filePath={cover} changePageCover={setCoverImage} />
      <div>
        <Title addNote={addNode} title={title} changePageTitle={setTitle} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                isFocused={focusedNodeIndex === index}
                updateFocusedIndex={setFocusedNodeIndex}
                index={index}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>

        <Spacer
          showHint={!nodes.length}
          handleClick={() => addNode({ type: "text", value: "", id: nanoid() }, nodes.length)}
        />
      </div>
    </>
  )
}
