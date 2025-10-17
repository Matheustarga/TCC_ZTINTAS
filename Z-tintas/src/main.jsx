import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



// 1 - configurando router
import {RouterProvider} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import MyRouter from "./MyRouter.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={MyRouter}/>
  </StrictMode>,
)
