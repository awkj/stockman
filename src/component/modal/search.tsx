import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { searchStocks } from "../../api/xueqiu/api"
import { StockMini } from "../../api/xueqiu/api"
import modalDom from "../util"
import { openSearchState, stocksState, StockStatus } from "../state"
import {
    useRecoilState,
    useRecoilValue,
} from 'recoil'


export default function SearchModal() {
    const openSearch = useRecoilValue(openSearchState)
    if (!openSearch) {
        return null
    }
    return (
        createPortal(<Search ></Search>
            , modalDom!)
    )
}

function Search() {
    const [keyword, setKeyword] = useState('')
    const [stockLists, setStockLists] = useState<StockMini[]>()

    useEffect(() => {
        const searchStock = async () => {
            try {
                if (keyword === "") {
                    return
                }
                const list = await searchStocks(keyword)
                setStockLists(list)
            } catch {

            }
        }
        searchStock()
    }, [keyword])

    const searchList = stockLists?.map(stock => {
        return <SearchList stock={stock}  ></SearchList>
    })
    return (
        <div className="z-100 bg-neutral-100 pt-4 pb-4 px-4 top-1/3 left-0 right-0 absolute rounded-xl w-4/5 mx-auto my-auto">
            <input
                onChange={e => setKeyword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg ring ring-blue-400  focus:border-blue-500 block w-full p-2">
            </input>
            <ul className="mt-2">
                {searchList}
            </ul>
        </div>
    )
}

function SearchList({ stock, }: { stock: StockMini, }) {
    const [stocks, setStock] = useRecoilState(stocksState)

    const addStock = (symbol: string) => {
        const newStocks = [...stocks, { symbol: symbol, expand: false }]
        const newStockUniq = [...new Map(newStocks.map(s => [s.symbol, s])).values()]
        setStock(newStockUniq)
    }

    let isInStocks = false
    stocks.forEach(s => {
        if (s.symbol === stock.symbol) {
            isInStocks = true
        }
    }
    )

    return (
        <li key={stock.symbol} className={`my-auto mx-auto py-1.5 px-2 ${!isInStocks ? "hover:bg-blue-300" : "hover:bg-gray-200"} ${!isInStocks ? "active:ring" : ""} hover:rounded-lg`}>
            <button disabled={isInStocks} className="flex flex-row justify-start w-full" onClick={() => {
                addStock(stock.symbol)
            }}>
                <span className="text-xs text-center my-auto">{stock.name}</span>
                <span className="text-xs text-center my-auto ml-auto font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded">{stock.symbol}</span>
            </button>
        </li>
    )
}