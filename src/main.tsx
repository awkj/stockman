import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuBar from './App'
import './index.css'
import 'flowbite'
import {
  RecoilRoot,
} from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense>
        <MenuBar />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>
)
