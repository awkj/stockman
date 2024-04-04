import { createPortal } from "react-dom"
import modalDom from "../util"
import { modalState } from "../state"
import { showExchange } from "../state"
import { useSetRecoilState, useRecoilState } from "recoil"

import {
    useRecoilValue,
} from 'recoil'

export default function CoinModal() {

    if (useRecoilValue(modalState) != 'coin') {
        return null
    }

    return (
        createPortal(
            <Coin ></Coin>
            , modalDom!)
    )
}


function Coin() {
    const [showExchangeValue, setShowExchange] = useRecoilState(showExchange)

    return (
        <div className="z-100 bottom-52px rounded-tr-xl absolute overflow-hidden left-0 w-16 bg-neutral-50 shadow ring ring-gray-100 whitespace-nowrap">
            <ul className="text-sm  text-gray-700 ">
                <li>
                    <button onClick={() => { setShowExchange(['SH', 'SZ']); console.log(showExchangeValue) }} className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white border-b">沪深</button>
                </li>
                <li>
                    <button onClick={() => { setShowExchange(['NYSE', 'NASDAQ']); console.log(showExchangeValue) }} className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white border-b">美股</button>
                </li>
                <li >
                    <button onClick={() => { setShowExchange(['F']); console.log(showExchangeValue) }} className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white">基金</button>
                </li>
                <li >
                    <button onClick={() => { setShowExchange(['']); console.log(showExchangeValue) }} className="block  text-center py-2 mx-0.5 px-4 hover:bg-blue-600/80 hover:shadow hover:rounded hover:text-white">全部</button>
                </li>
            </ul>
        </div>
    )
}
