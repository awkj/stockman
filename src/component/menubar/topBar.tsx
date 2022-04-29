import { StockDetail } from "../../api/xueqiu/api"
import { getTextClass, openXueqiu } from "../util"

export default function TopIndex({ stocks: stockDetails }: { stocks: StockDetail[] | undefined }) {
    if (!stockDetails) {
        return <></>
    }

    const stockDiv = stockDetails.map((stock, index) => {
        return <IndexItem key={stock.symbol} stock={stock}></IndexItem>
    })
    return (
        <div className="w-full h-32">
            <div data-tauri-drag-region className="flex flex-row  justify-around py-2.5  bg-stone-200 ">
                {stockDiv}
            </div>
        </div>

    )
}


function IndexItem({ stock: stockDetail }: { stock: StockDetail }) {
    const textColor = `text-red-700`
    return <div className="flex flex-col text-center ">
        <span className="text-center font-semibold">{stockDetail.name}</span>
        <button onClick={() => { openXueqiu(stockDetail.symbol) }}>
            <span className={`text-center  ${getTextClass(stockDetail.percent)} font-semibold`}>{stockDetail.now}</span>
        </button>
        <span className={`text-center text-xs ${getTextClass(stockDetail.percent)}`}>{stockDetail.percent + "%"} </span>
    </div>
}