import { Stock } from "../apiv2/api"
import { open } from '@tauri-apps/api/shell'
import { getBackgoundClass } from './util'
export default function StockList({ stocks }: { stocks: Stock[] | undefined }) {
    if (!stocks) {
        return <></>
    }

    const stockDiv = stocks.slice(3).map((stock, index) => {
        return <StockItem stock={stock}></StockItem>
    })
    return <div className="flex flex-col divide-y divide-dashed  divide-gray-200  space-y-1 mt-2 ">
        {stockDiv}
    </div>
}

function StockItem({ stock }: { stock: Stock }) {
    return (
        <div className="flex flex-row justify-center pt-0.5 rounded-sm hover:bg-sky-100 hover:ring hover:ring-sky-100 hover:ring-offset-1 hover:ring-offset-blue-100">
            <div className="flex flex-col mr-auto5">
                <span className="whitespace-nowrap tracking-widest text-xs font-normal pl-0.5">{stock.name}</span>
                <button className="scale-90 origin-left " onClick={() => {
                    openXueqiu(stock.symbol)
                }}>
                    <span className="font-mono bg-blue-100 text-blue-800 hover:bg-blue-200  hover:shadow text-xs font-normal px-1 py-0.5 rounded">{stock.symbol}</span>
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

async function openXueqiu(symbol: string) {
    await open(`https://xueqiu.com/S/${symbol}`)
}

