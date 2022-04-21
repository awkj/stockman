import { Stock } from "../../api/xueqiu/api"
import { getTextClass, openXueqiu } from "../util"

export default function TopIndex({ stocks }: { stocks: Stock[] | undefined }) {
    if (!stocks) {
        return <></>
    }

    const stockDiv = stocks.slice(0, 3).map((stock, index) => {
        return <IndexItem key={stock.symbol} stock={stock}></IndexItem>
    })
    return (
        <div className="absolute top-0 w-full">
            <div className="flex flex-row  justify-around py-2.5  bg-stone-200 ">
                {stockDiv}
            </div>
        </div>

    )
}


function IndexItem({ stock }: { stock: Stock }) {
    const textColor = `text-red-700`
    return <div className="flex flex-col text-center ">
        <span className="text-center font-semibold">{stock.name}</span>
        <button onClick={() => { openXueqiu(stock.symbol) }}>
            <span className={`text-center  ${getTextClass(stock.percent)} font-semibold`}>{stock.now}</span>
        </button>
        <span className={`text-center text-xs ${getTextClass(stock.percent)}`}>{stock.percent + "%"} </span>
    </div>
}