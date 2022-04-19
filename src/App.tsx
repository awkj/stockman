import { useEffect, useState } from 'react'
import { getStocks, Stock } from "./apiv2/api"
import TopIndex from "./component/topIndex"
import StockList from "./component/stockList"
import BottomBar from "./component/bottomBar"

const IndexStock = {
  '上证指数': 'SH000001',
  '深证成指': 'SZ399001',
  '创业板指': 'SZ399006',
}
/*
   
*/
function App() {
  const [stocks, setStocks] = useState<Stock[]>()

  useEffect(() => {
    const getData = async () => {
      try {
        const info = await getStocks([
          IndexStock.上证指数,
          IndexStock.深证成指,
          IndexStock.创业板指,
          "SZ002466",
          "SZ002192",
          "SH601988",
          "SZ002176",
          "SZ002241",
          "SZ002460",
          "SH601899",
          "SZ300750",
          "SZ002594",
          "SZ002738",
          "SZ002432",
          "SZ301058",
        ])
        setStocks(info)
      } catch (e) {
      }
    }
    getData()
    setInterval(getData, 5000)
  }, [])

  return (
    <div className="m-4 flex flex-col mt-3 mb-3 mx-3">
      <TopIndex stocks={stocks}></TopIndex>
      <StockList stocks={stocks}></StockList>
      <BottomBar stock={stocks ? stocks[0] : undefined}></BottomBar>
    </div >
  )
}

export default App
