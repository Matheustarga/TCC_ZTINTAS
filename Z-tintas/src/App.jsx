import { useState } from 'react'
import './App.css'
//Reaproveitamento de estrutura com o Outlet
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  

  return (
    <>
      
      <Outlet />
    </>
  )
}

export default App
