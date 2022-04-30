import { useState } from "react"
import { StockDetail } from "../../api/xueqiu/api"
import dollar from '../../assets/dollar.svg'
import { Modal } from "../../App"
import { getTips } from "../util"
import { backgroundBlurState, openCoinState, openSearchState, openSettingState } from "../state"
import {
    useSetRecoilState,
    useRecoilValue,
    useRecoilState,
} from 'recoil'


export default function ButtomBar({ stock }: { stock: StockDetail | undefined }) {
    const [tips, setTips] = useState('')
    const [displayText, displayClass] = getTips(tips, stock)
    const [openSearch, setOpenSearch] = useRecoilState(openSearchState)
    const [openSetting, setOpenSetting] = useRecoilState(openSettingState)
    const [openCoin, setOpenCoin] = useRecoilState(openCoinState)

    return (
        <div className="flex flex-row bg-stone-200 h-12 w-full absolute bottom-0">
            <div className="flex ml-4 my-auto ">
                <button
                    type="button" className={`items-center rounded-full text-yellow-500/90  hover:text-blue-600/90 active:ring active:ring-blue-300 active:ring-inset ${openCoin ? "text-blue-600/90 " : ""} `}
                    onClick={() => {
                        setOpenCoin((value) => !value)
                        setOpenSetting(false)
                        setOpenSearch(false)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shadow" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div
                className="w-4/5 h-full flex"
            >
                <button
                    type="button"
                    onMouseOver={() => { setTips('添加自选') }}
                    onMouseOut={() => { setTips('') }}
                    onClick={() => {
                        setOpenSearch((value) => !value)
                        setOpenSetting(false)
                        setOpenCoin(false)
                    }}
                    className={`shadow mx-auto w-4/5 whitespace-nowrap px-5 py-1 my-auto  hover:bg-blue-600/80 text-white  font-medium rounded-md text-sm  text-center items-center ${displayClass} ${openSearch ? "bg-blue-600/80 " : ""}`}
                >
                    {openSearch ? "添加自选" : displayText}
                </button>
            </div>

            <button
                type="button"
                onClick={() => {
                    setOpenSetting((value) => !value)
                    setOpenCoin(false)
                    setOpenSearch(false)
                }}
                className={`h-8 w-8 my-auto mr-4 ml-auto text-gray-900/80 rounded-full hover:text-blue-700/90  hover:shadow active:shadow active:shadow-neutral-500 ${openSetting ? "text-blue-700/90 shadow" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className=" " viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            </button>
        </div >
    )
}


