import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuBar from './menuBar'
import News from './news'
import './index.css'
import { getCurrent } from '@tauri-apps/api/window'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {(getCurrent().label === 'MenuBar') ? <MenuBar /> : <News />}
  </React.StrictMode>
)
