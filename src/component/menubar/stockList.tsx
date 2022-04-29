import { useState } from "react"
import { StockDetail } from "../../api/xueqiu/api"
import { getBackgoundClass, getTextClassByDiff, openXueqiu } from '../util'

import { backgroundBlurState, openSearchState, openSettingState } from "../state"
import {
    useSetRecoilState,
    useRecoilValue,
} from 'recoil'
import StockExpand from "./stockExpand"

export default function StockList({ stocks: stockDetails }: { stocks: StockDetail[] | undefined }) {
    console.log("StockList", stockDetails)
    const setOpenSearch = useSetRecoilState(openSearchState)
    const setOpenSetting = useSetRecoilState(openSettingState)
    const backgroundBlur = useRecoilValue(backgroundBlurState)

    if (stockDetails?.length === 0) {
        return (
            <div
                className={`w-full absolute top-84px bottom-12 overflow-y-auto scrollbar-hide ${backgroundBlur ? 'blur-sm' : ''}`}
                onClick={() => {
                    setOpenSearch(false)
                    setOpenSetting(false)
                }}>
                <div className="flex flex-col items-center justify-center h-full text-gray-700">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="text-sm mt-3 ">点击下方添加自选</span>
                </div>
            </div >
        )
    }

    const stockDiv = stockDetails?.map((stockDetail, index) => {
        return <StockItem key={stockDetail.symbol} stockDetail={stockDetail} ></StockItem>
    })
    return (
        <div className={`w-full absolute top-84px bottom-12 overflow-y-auto scrollbar-hide ${backgroundBlur ? 'blur-sm' : ''}`} onClick={() => {
            setOpenSearch(false)
            setOpenSetting(false)
        }}>
            <div className="flex flex-col mt-2 mx-3 divide-y divide-dashed  divide-gray-200 ">
                {stockDiv}
            </div>
        </div >
    )
}

function StockItem({ stockDetail }: { stockDetail: StockDetail }) {
    const backgroundBlur = useRecoilValue(backgroundBlurState)

    const [expand, setExpand] = useState(false)
    return (
        <div className="flex flex-col"  >
            <div className="flex flex-row justify-center p-2 rounded hover:bg-sky-100 hover:ring hover:ring-sky-100 hover:ring-offset-1 hover:ring-offset-blue-100" onClick={() => {
                if (!backgroundBlur) {
                    setExpand(e => !e)
                }
            }
            }>
                <div className="flex flex-col mr-auto items-start">
                    <span className="whitespace-nowrap  tracking-widest text-xs font-normal pl-0.5">{stockDetail.name}</span>
                    <button onClick={() => {
                        openXueqiu(stockDetail.symbol)
                    }}>
                        <span className="font-mono py-0.5 px-1 bg-blue-100 text-blue-800 hover:bg-blue-400/70  hover:shadow text-xs font-normal rounded">{stockDetail.symbol}</span>
                    </button>
                </div>

                <div className="flex flex-row ml-auto items-center">
                    <span className="mr-4 text-sm">{stockDetail.now}</span>
                    <div className={`${getBackgoundClass(stockDetail.percent)} ml-auto mr-0.5 w-16 h-6 rounded  text-white text-center`}>
                        <span className="">{stockDetail.percentStr}</span>
                        <span className="font-light text-xs indent-2">%</span>
                    </div>
                </div>
            </div >

            <StockExpand stockDetail={stockDetail} expand={expand} ></StockExpand>
        </div >
    )
}



