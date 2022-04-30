import { useEffect, useState } from 'react'
import { getStocks, StockDetail } from "./api/xueqiu/api"
import TopIndex from "./component/menubar/topBar"
import StockList from "./component/menubar/stockList"
import BottomBar from "./component/menubar/bottomBar"
import {
  useRecoilValue,
} from "recoil"
import { stocksState } from "./component/state"
import Modal from "./component/modal/modal"
import { saveStockToStore } from "./component/util"

const IndexStock = {
  '上证指数': 'SH000001',
  '深证成指': 'SZ399001',
  '创业板指': 'SZ399006',
}

const stockIndex = [
  IndexStock.上证指数,
  IndexStock.深证成指,
  IndexStock.创业板指,
]

export interface Modal {
  searchModalOpen: boolean
  settingModalOpen: boolean
}



function App() {
  const [stockDetails, setStockDetails] = useState<StockDetail[]>()
  const stocks = useRecoilValue(stocksState)

  useEffect(() => {
    const getData = async () => {
      try {
        let stocksSearch = []
        stocksSearch.unshift(...stockIndex, ...stocks.map(stock => stock.symbol))
        const info = await getStocks(stocksSearch)
        setStockDetails(info)
        await saveStockToStore(stocks)
      } catch (e) {
      }
    }
    getData()
    const intervalId = setInterval(getData, 5000)
    return () => clearInterval(intervalId)
  }, [stocks])


  return (
    <div className="flex flex-col z-0 h-4">
      <TopIndex stocks={stockDetails?.slice(0, 3)}></TopIndex>
      <StockList stocks={stockDetails?.slice(3)} ></StockList>
      <Modal></Modal>
      <BottomBar stock={stockDetails ? stockDetails[0] : undefined} ></BottomBar>
    </div >
  )
}



export default App