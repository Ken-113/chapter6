import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Header } from './components/Header/index.jsx'
import { Home } from './components/Home/Home.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Header/>
    <Home/>
    </>
  </StrictMode>,
)
