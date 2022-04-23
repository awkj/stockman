import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { searchStocks } from "../../api/xueqiu/api"
import { StockMini } from "../../api/xueqiu/api"
import { addStockToStore } from "../util"
import modalDom from "../base"
import { Modal } from '../../menuBar'

export default function Search({ modalStatus }: { modalStatus: Modal }) {
    if (!modalStatus.searchModalOpen) {
        return null
    }
    return (
        createPortal(
            <SearchModal ></SearchModal>
            , modalDom!)
    )
}


function SearchModal() {
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
    return (
        <li key={stock.symbol} className="my-auto mx-auto py-1.5 px-2 hover:bg-blue-200 hover:rounded-lg">
            <button className="flex flex-row justify-start w-full" onClick={() => {
                addStockToStore(stock.symbol)
            }}>
                <span className="text-xs text-center my-auto">{stock.name}</span>
                <span className="text-xs text-center my-auto ml-auto font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded">{stock.symbol}</span>
            </button>
        </li>
    )
}