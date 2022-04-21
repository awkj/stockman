import { useState } from "react"
import { Stock } from "../../api/xueqiu/api"
import dollar from '../../assets/dollar.svg'
import { getTips } from "../util"

export default function ButtomBar({ stock, setModalOpen }: { stock: Stock | undefined, setModalOpen: Function }) {
    const [tips, setTips] = useState('')
    const [displayText, displayClass] = getTips(tips, stock)
    return (
        <div className="flex flex-row bg-stone-200 h-12 w-full absolute bottom-0">
            <button type="button" className=" items-center w-7 h-7 ml-4 p-1 my-auto  rounded-full  bg-yellow-400/70 hover:shadow-lg  hover:bg-yellow-500/80">
                <img src={dollar} className="" />
            </button>
            <button
                type="button"
                onMouseOver={() => { setTips('添加自选') }}
                onMouseOut={() => { setTips('') }}
                onClick={() => { setModalOpen((value: boolean) => !value) }}
                className={`mx-auto w-3/5 ml-6 whitespace-nowrap  my-auto h-[60%]  text-white  hover:bg-fuchsia-800/80 font-medium rounded-md text-sm  text-center items-center ${displayClass}`}
            >
                {displayText}
            </button>
            <button type="button" className="h-8 w-8 my-auto mr-4 ml-auto text-gray-900/80 rounded-full  hover:shadow hover:shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            </button>
        </div >
    )
}


