import { Stock } from "../apiv2/api"
import { getTextClass } from "./util"

export default function TopIndex({ stocks }: { stocks: Stock[] | undefined }) {
    if (!stocks) {
        return <></>
    }

    const stockDiv = stocks.slice(0, 3).map((stock, index) => {
        return <IndexItem stock={stock}></IndexItem>
    })
    return (
        <div>
            <div className="flex flex-row justify-around bg-gray-200 py-1 rounded-md ">
                {stockDiv}
            </div>
        </div>

    )
}


function IndexItem({ stock }: { stock: Stock }) {
    const textColor = `text-red-700`
    return <div className="flex flex-col">
        <span className="font-semibold">{stock.name}</span>
        <span className={`${getTextClass(stock.percent)} font-semibold`}>{stock.now}</span>
    </div>
}