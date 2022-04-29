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
    const setOpenSearch = useSetRecoilState(openSearchState)
    const setOpenSetting = useSetRecoilState(openSettingState)
    const setOpenCoin = useSetRecoilState(openCoinState)

    return (
        <div className="flex flex-row bg-stone-200 h-12 w-full absolute bottom-0">
            <div className="flex ml-4 my-auto ">
                <button
                    type="button" className="p-1 w-7 h-7items-center rounded-full  shadow ring-gray-200 bg-yellow-400/80 hover:shadow-lg  hover:bg-green-500/90"
                    onClick={() => {
                        setOpenCoin((value) => !value)
                        setOpenSearch(false)
                    }}
                >
                    <img src={dollar} className="" />
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
                    }}
                    className={`shadow mx-auto w-4/5 whitespace-nowrap px-5 py-1 my-auto  hover:bg-blue-600/80 text-white  font-medium rounded-md text-sm  text-center items-center ${displayClass}`}
                >
                    {displayText}
                </button>
            </div>

            <button
                type="button"
                onClick={() => {
                    setOpenSetting((value) => !value)
                    setOpenCoin(false)
                }}
                className="h-8 w-8 my-auto mr-4 ml-auto text-gray-900/80 rounded-full  hover:shadow hover:shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            </button>
        </div >
    )
}


