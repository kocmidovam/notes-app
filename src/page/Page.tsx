import { useFocusedNodeIndex } from "./useFocusedeNodeIndex"
import { Cover } from "./Cover"
import { Title } from "./Title"
import { BasicNode } from "../node/BasicNode"
import { Spacer } from "./Spacer"
import { nanoid } from "nanoid"
import { useAppState } from "../state/AppStateContext"

export const Page = () => {
  const {title, nodes, addNode, setTitle} = useAppState()
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })

  return (
    <>
      <Cover />
      <div>
        <Title addNote={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            index={index}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          handleClick={() => addNode({ type: "text", value: "", id: nanoid() }, nodes.length)}
        />
      </div>
    </>
  )
}
