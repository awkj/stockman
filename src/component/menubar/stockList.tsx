import { useState } from "react"
import { Stock } from "../../api/xueqiu/api"
import { Modal } from '../../menuBar'
import { getBackgoundClass, getTextClassByDiff, openXueqiu } from '../util'

export default function StockList({ stocks, modalStatus, setModalStatus, }: { stocks: Stock[] | undefined, modalStatus: Modal, setModalStatus: Function }) {
    if (!stocks) {
        return <></>
    }

    const stockDiv = stocks.slice(3).map((stock, index) => {
        return <StockItem key={stock.symbol} stock={stock} modalStatus={modalStatus}></StockItem>
    })
    return (
        <div className={`w-full absolute top-84px bottom-12 overflow-y-auto scrollbar-hide ${modalStatus.searchModalOpen === true || modalStatus.settingModalOpen == true ? 'blur-sm' : ''}`} onClick={() => {
            setModalStatus({
                searchModalOpen: false,
                settingModalOpen: false,
            })
        }}>
            <div className="flex flex-col mt-2 mx-3 divide-y divide-dashed  divide-gray-200 ">
                {stockDiv}
            </div>
        </div >
    )
}

function StockItem({ stock, modalStatus }: { stock: Stock, modalStatus: Modal, }) {
    console.log("stock", stock)
    const [expand, setExpand] = useState(false)
    return (
        <div className="flex flex-col"  >
            <div className="flex flex-row justify-center p-2 rounded hover:bg-sky-100 hover:ring hover:ring-sky-100 hover:ring-offset-1 hover:ring-offset-blue-100" onClick={() => {
                if (!modalStatus.searchModalOpen && !modalStatus.settingModalOpen) {
                    setExpand(e => !e)
                }
            }
            }>
                <div className="flex flex-col mr-auto">
                    <span className="whitespace-nowrap  tracking-widest text-xs font-normal pl-0.5">{stock.name}</span>
                    <button className="scale-90 origin-left " onClick={() => {
                        openXueqiu(stock.symbol)
                    }}>
                        <span className="font-mono bg-blue-100 text-blue-800 hover:bg-blue-300/90  hover:shadow text-xs font-normal px-1 py-0.5 rounded">{stock.symbol}</span>
                    </button>
                </div>
                <div className="flex flex-row ml-auto items-center">
                    <span className="mr-4 text-sm">{stock.now}</span>
                    <div className={`${getBackgoundClass(stock.percent)} ml-auto mr-0.5 w-16 h-6 rounded  text-white text-center`}>
                        <span className="">{stock.percentStr}</span>
                        <span className="font-light text-xs indent-2">%</span>
                    </div>
                </div>
            </div >

            <div className={`${expand == true ? '' : 'hidden'} flex flex-row`} >
                <div className="p-2 grid grid-cols-2 gap-4 w-2/3 ">
                    <GridPrice leftText="最高" rightText={stock.high} textBg={getTextClassByDiff(stock.high, stock.last_close)}></GridPrice>
                    <GridPrice leftText="最低" rightText={stock.low} textBg={getTextClassByDiff(stock.low, stock.last_close)}></GridPrice>
                    <GridPrice leftText="今开" rightText={stock.open} textBg={getTextClassByDiff(stock.open, stock.last_close)}></GridPrice>
                    <GridPrice leftText="昨收" rightText={stock.last_close} textBg={'text-neutral-700'}></GridPrice>
                    <GridPrice leftText="量比" rightText={stock.volume_ratio} textBg={'text-neutral-700'}></GridPrice>
                    <GridPrice leftText="换手" rightText={stock.turnover_rate} textBg={'text-neutral-700'}></GridPrice>
                </div >
                <div className="w-1/3 mx-auto my-auto">
                    <div className="flex flex-col ">
                        <button className="text-gray-900 bg-white border  focus:outline-none hover:bg-blue-600/90 hover:shadow hover:text-white focus:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-0.5 mb-3">删除</button>
                        <button className="text-gray-900 bg-white border  focus:outline-none hover:bg-blue-600/90 hover:shadow hover:text-white focus:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-0.5 ">置顶</button>
                    </div>

                </div>
            </div >

        </div >
    )
}


const highSVG = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
const lowSVG = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>

function GridPrice({ leftText, rightText, textBg }: { leftText: string, rightText: number | string, textBg: string }) {
    return (
        <div className="flex w-fit text-sm whitespace-nowrap  bg-gray-50 shadow hover:bg-gray-200/80 hover:ring hover:ring-gray-200/80 rounded-lg px-2 py-0.5 my-auto">
            <span className="my-auto mr-2 items-center ">{leftText + ":"}</span>
            <span className={`${textBg} my-auto`}>{rightText}</span>
        </div>
    )


}



