import { useEffect, useState } from 'react'
import { getStocks, StockDetail } from "./api/xueqiu/api"
import TopIndex from "./component/menubar/topBar"
import StockList from "./component/menubar/stockList"
import BottomBar from "./component/menubar/bottomBar"
import {
  useRecoilValue,
} from "recoil"
import { stocksState, showExchange } from "./component/state"
import Modal from "./component/modal/modal"
import { saveStockToStore } from "./component/util"

const IndexStock = {
  '上证指数': 'SH000001',
  '深证成指': 'SZ399001',
  '创业板指': 'SZ399006',
  '纳斯达克': '.IXIC',
  '道琼斯': '.DJI',
  '标普': '.INX'
}

const stockIndex = [
  IndexStock.深证成指,
  IndexStock.上证指数,
  IndexStock.创业板指,
  IndexStock.道琼斯,
  IndexStock.纳斯达克,
  IndexStock.标普,
]

export interface Modal {
  searchModalOpen: boolean
  settingModalOpen: boolean
}



function App() {
  const showExchangeValue = useRecoilValue(showExchange)
  const [stockDetails, setStockDetails] = useState<StockDetail[]>()
  const stocks = useRecoilValue(stocksState)
  const [topStocks, setTopStocks] = useState<StockDetail[]>()

  const useUSATop = (): boolean =>
    showExchangeValue.includes('NYSE')


  useEffect(() => {
    const getData = async () => {
      try {
        let stocksSearch = []
        stocksSearch.unshift(...stocks.map(stock => stock.symbol))
        console.log(stocks)
        const info = await getStocks(stocksSearch)
        if (!info) return
        setStockDetails(info)
        const top = await getStocks(stockIndex)
        setTopStocks(top)
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
      <TopIndex stocks={useUSATop() ? topStocks?.slice(3, 6) : topStocks?.slice(0, 3)}></TopIndex>
      <StockList stocks={stockDetails?.filter(stock =>
        showExchangeValue.some(exchange =>
          stock.exchange.includes(exchange)
        )
      )} ></StockList>
      <Modal></Modal>
      <BottomBar stock={topStocks ? (useUSATop() ? topStocks[3] : topStocks[0]) : undefined} ></BottomBar>
    </div >
  )
}



export default App