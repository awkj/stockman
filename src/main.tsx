import React from 'react'
import ReactDOM from 'react-dom/client'
import MenuBar from './App'
import './index.css'
import 'flowbite'
import { RecoilRoot, } from 'recoil'
import { listen } from "@tauri-apps/api/event"

listen("tauri://update-status", function (res) {
  console.log("New status: ", res)
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense>
        <MenuBar />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>
)
