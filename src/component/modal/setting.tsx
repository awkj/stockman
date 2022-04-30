import { createPortal } from "react-dom"
import modalDom from "../util"
import { appWindow } from "@tauri-apps/api/window"
import { openSettingState, stocksState } from "../state"

import {
    useRecoilValue,
} from 'recoil'
import { saveStockToStore } from "../util"

export default function SettingModal() {
    const openSetting = useRecoilValue(openSettingState)

    if (!openSetting) {
        return null
    }

    return (
        createPortal(
            <Setting ></Setting>
            , modalDom!)
    )
}


function Setting() {
    const stocks = useRecoilValue(stocksState)

    return (
        <div className="z-100 bottom-52px rounded-tl-xl absolute overflow-hidden right-0 w-20 bg-neutral-50 shadow ring ring-gray-100 whitespace-nowrap">
            <ul className="text-sm  text-gray-700 ">
                {/* <li>
                    <a href="#" className="block text-center py-2 mx-0.5 px-3 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white border-b">展开</a>
                </li>
                <li>
                    <a href="#" className="block text-center py-2 mx-0.5 px-3 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white border-b">折叠</a>
                </li> */}
                <li>
                    <a href="#" className="block text-center py-2 mx-0.5 px-3 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white border-b">设置</a>
                </li>
                <li onClick={async () => {
                    await saveStockToStore(stocks)
                    appWindow.close()
                }}>
                    <a href="#" className="block  text-center py-2 mx-0.5 px-3 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white">退出</a>
                </li>
            </ul>
        </div>
    )
}
