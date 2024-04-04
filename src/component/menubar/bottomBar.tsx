import { useState } from "react"
import { StockDetail } from "../../api/xueqiu/api"
import { getTips } from "../util"
import { useRecoilState } from 'recoil'
import stockmanSvg from '../../assets/stockman2.svg'
import configSvg from '../../assets/config.svg'
import { modalState } from "../state"

export default function BottomBar({ stock }: { stock: StockDetail | undefined }) {
    const [modalStateValue, setModalState] = useRecoilState(modalState)
    const [tips, setTips] = useState('')
    const [displayText, displayClass] = getTips(tips, stock)
    return (
        <div className="flex flex-row bg-stone-200 h-12 w-full absolute bottom-0">
            <div className="flex ml-4 my-auto ">
                <button
                    type="button" className={`items-center p-1  active:ring active:ring-amber-400  rounded-full select-none `}
                    onClick={() => {
                        setModalState((value) => value === 'coin' ? null : 'coin')
                    }}
                >
                    <img src={stockmanSvg} className="w-7 h-7 select-none" />
                </button>
            </div>

            <div
                className="w-4/5 h-full flex-grow flex"
            >
                <button
                    type="button"
                    onMouseOver={() => { setTips('添加自选') }}
                    onMouseOut={() => { setTips('') }}
                    onClick={() => {
                        setModalState((value) => value === 'search' ? null : 'search')
                    }}
                    className={`shadow mx-auto w-4/5 whitespace-nowrap px-5 py-1 my-auto  hover:bg-blue-600/80 text-white  font-medium rounded-md text-sm  text-center items-center ${displayClass} ${modalStateValue === 'search' ? "bg-blue-600/80 " : ""}`}
                >
                    {modalStateValue === 'search' ? "添加自选" : displayText}
                </button>
            </div>

            <div className="flex mr-4 my-auto ">
                <button
                    type="button" className={`items-center p-1  active:ring active:ring-amber-400  rounded-full select-none `}
                    onClick={() => {
                        setModalState((value) => value === 'setting' ? null : 'setting')
                    }}
                >
                    <img src={configSvg} className="w-7 h-7 select-none" />
                </button>
            </div>
        </div >
    )
}


