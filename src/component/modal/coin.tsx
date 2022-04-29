import { createPortal } from "react-dom"
import modalDom from "../util"
import { openCoinState } from "../state"

import {
    useRecoilValue,
} from 'recoil'

export default function CoinModal() {
    const openCoin = useRecoilValue(openCoinState)

    if (!openCoin) {
        return null
    }

    return (
        createPortal(
            <Coin ></Coin>
            , modalDom!)
    )
}


function Coin() {

    return (
        <div className="z-100 bottom-52px rounded-tr-xl absolute overflow-hidden left-0 w-16 bg-neutral-50 shadow ring ring-gray-100 whitespace-nowrap">
            <ul className="text-sm  text-gray-700 ">
                <li>
                    <a href="#" className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white border-b">A股</a>
                </li>
                <li>
                    <a href="#" className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white border-b">港股</a>
                </li>
                <li >
                    <a href="#" className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white">美股</a>
                </li>
                <li >
                    <a href="#" className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white">币市</a>
                </li>
            </ul>
        </div>
    )
}
