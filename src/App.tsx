import "./App.css"
import { Cover } from "./page/Cover"
import { Spacer } from "./page/Spacer"

function App() {
  return (
    <>
      <Cover />
      <Spacer
        handleClick={() => {
          console.log("clicked")
        }}
        showHint={true}
      />
    </>
  )
}

export default App
