import { useState } from 'react'
import './App.css'
//Reaproveitamento de estrutura com o Outlet
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
