import { Stock } from "../../api/xueqiu/api"
import { getBackgoundClass, openXueqiu } from '../util'
export default function StockList({ stocks, setModalOpen, modalOpen }: { stocks: Stock[] | undefined, setModalOpen: Function, modalOpen: boolean }) {
    if (!stocks) {
        return <></>
    }

    const stockDiv = stocks.slice(3).map((stock, index) => {
        return <StockItem key={stock.symbol} stock={stock}></StockItem>
    })
    return (
        <div className={`w-full absolute top-84px bottom-12 overflow-y-auto scrollbar-hide ${modalOpen === true ? 'blur-sm' : ''}`} onClick={() => { setModalOpen(false) }}>
            <div className="flex flex-col mt-2 mx-3 divide-y divide-dashed  divide-gray-200 ">
                {/* <div className="flex flex-col mt-2 mx-3 "> */}
                {stockDiv}
            </div>
        </div >
    )
}

function StockItem({ stock }: { stock: Stock }) {
    return (
        <div className="flex flex-row justify-center p-2 rounded hover:bg-sky-100 hover:ring hover:ring-sky-100 hover:ring-offset-1 hover:ring-offset-blue-100">
            <div className="flex flex-col mr-auto">
                <span className="whitespace-nowrap tracking-widest text-xs font-normal pl-0.5">{stock.name}</span>
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
    )
}




