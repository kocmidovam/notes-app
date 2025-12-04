import "./App.css"
import { Cover } from "./page/Cover"
import { Spacer } from "./page/Spacer"
import { Title } from "./page/Title"

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
      <Title
        title='My Page Title'
        changePageTitle={(title) => {
          console.log("Title changed to:", title)
        }}
        addNote={(node, index) => {
          console.log("Add note:", node, "at index:", index)
        }}
      />
    </>
  )
}

export default App
