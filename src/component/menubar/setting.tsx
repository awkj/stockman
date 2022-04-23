import { createPortal } from "react-dom"
import modalDom from "../base"
import { Modal } from '../../menuBar'
import { appWindow } from "@tauri-apps/api/window"

export default function SettingModal({ modalStatus }: { modalStatus: Modal }) {
    if (!modalStatus.settingModalOpen) {
        return null
    }
    return (
        createPortal(
            <Setting ></Setting>
            , modalDom!)
    )
}

function Setting() {
    return (
        <div className="z-100 bottom-12 rounded-t absolute  overflow-hidden right-0 w-32 bg-neutral-50  shadow ring ring-gray-100">
            <ul className="py-1 text-sm  text-gray-700 ">
                <li>
                    <a href="#" className="block text-center py-2 mx-1 px-4 hover:bg-blue-600/90 hover:shadow hover:rounded hover:text-white border-b">设置</a>
                </li>
                <li onClick={() => { appWindow.close() }}>
                    <a href="#" className="block text-center py-2 mx-1 px-4 hover:bg-blue-600/90 hover:shadow hover:rounded hover:text-white">退出</a>
                </li>
            </ul>
        </div>
    )
}
