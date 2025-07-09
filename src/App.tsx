import { useState } from "react"
import Login from "./components/Login";
import Home from "./Home";

function App() {
  const [username, setUsername] = useState("")

  return (
    <>
      <h1>Simple Webchat</h1>
      {username ?
        <Home username={username} /> :
        <Login submit={setUsername} />
      }
    </>
  )
}

export default App
