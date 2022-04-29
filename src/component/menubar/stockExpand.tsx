import { useRecoilState } from "recoil"
import { StockDetail } from "../../api/xueqiu/api"
import { stocksState } from "../state"
import { getTextClassByDiff } from "../util"

export default function StockExpand({ stockDetail, expand }: { stockDetail: StockDetail, expand: boolean }) {
    const [stocks, setStock] = useRecoilState(stocksState)

    const i = stocks.indexOf(stockDetail.symbol)

    const isTop = i === 0
    const isDown = i === stocks.length - 1

    const removeStock = () => {
        const newStocks = stocks.filter((item) => item !== stockDetail.symbol)
        setStock(newStocks)
    }

    const upStock = () => {
        const newStocks = [...stocks];
        [newStocks[i], newStocks[i - 1]] = [newStocks[i - 1], newStocks[i]]
        setStock(newStocks)
    }

    const downStock = () => {
        const newStocks = [...stocks];
        [newStocks[i], newStocks[i + 1]] = [newStocks[i + 1], newStocks[i]]
        setStock(newStocks)
    }

    return (
        <div className={`${expand == true ? '' : 'hidden'} w-full`} >
            <div className="p-2 grid grid-cols-3 gap-x-10 gap-y-3 w-full">
                <GridItem leftText="最高" rightText={stockDetail.high} textBg={getTextClassByDiff(stockDetail.high, stockDetail.last_close)}></GridItem>
                <GridItem leftText="最低" rightText={stockDetail.low} textBg={getTextClassByDiff(stockDetail.low, stockDetail.last_close)}></GridItem>
                <GridItem leftText="量比" rightText={stockDetail.volume_ratio} textBg={'text-neutral-700'}></GridItem>
                <GridItem leftText="今开" rightText={stockDetail.open} textBg={getTextClassByDiff(stockDetail.open, stockDetail.last_close)}></GridItem>
                <GridItem leftText="昨收" rightText={stockDetail.last_close} textBg={'text-neutral-700'}></GridItem>
                <GridItem leftText="换手" rightText={stockDetail.turnover_rate} textBg={'text-neutral-700'}></GridItem>
                <GridItem leftText="涨停" rightText={stockDetail.limit_up} textBg={getTextClassByDiff(stockDetail.limit_up, stockDetail.last_close)}></GridItem>
                <GridItem leftText="跌停" rightText={stockDetail.limit_down} textBg={getTextClassByDiff(stockDetail.limit_down, stockDetail.last_close)}></GridItem>
                <div className={`${expand == true ? '' : 'hidden'} space-x-2 pl-2 text-blue-600/80 `} >
                    <button disabled={isTop} className={`rounded-full rotate-180 ${isTop ? " text-gray-200" : "hover:ring active:ring-blue-600"}`} onClick={() => {
                        upStock()
                    }} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button disabled={isDown} className={`rounded-full  ${isDown ? " text-gray-200" : "hover:ring active:ring-blue-600 "}`} onClick={() => {
                        downStock()
                    }} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="rounded-full hover:ring active:ring-blue-600" onClick={() => {
                        removeStock()
                    }} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div >
        </div >
    )
}

function GridItem({ leftText, rightText, textBg }: { leftText: string, rightText: number | string, textBg: string }) {
    return (
        <div className="flex w-fit text-sm whitespace-nowrap  bg-gray-50 shadow hover:bg-gray-200/80 hover:ring hover:ring-gray-200/80 rounded-lg px-2 py-0.5 my-auto">
            <span className="my-auto mr-2 items-center ">{leftText + ":"}</span>
            <span className={`${textBg} my-auto`}>{rightText}</span>
        </div>
    )
}

