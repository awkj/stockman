import { useEffect, useState } from 'react'
import { getStocks, Stock } from "./api/xueqiu/api"
import TopIndex from "./component/menubar/topIndex"
import StockList from "./component/menubar/stockList"
import BottomBar from "./component/menubar/bottomBar"
import Search from "./component/menubar/search"
import SettingModal from "./component/menubar/setting"
import { getStockToStore, saveStockToStore } from "./component/util"
import { useImmer } from 'use-immer'

const IndexStock = {
  '上证指数': 'SH000001',
  '深证成指': 'SZ399001',
  '创业板指': 'SZ399006',
}
/*
   
*/
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
  const [stocks, setStocks] = useState<Stock[]>()
  // const [stockNumList, setStockNumList] = useImmer<string[]>([])
  const [modalStatus, setModalStatus] = useState<Modal>({
    searchModalOpen: false,
    settingModalOpen: false
  })

  useEffect(() => {
    // const buildData = async () => {
    //   setStockNumList(await getStockToStore())
    //   await saveStockToStore(stockNumList)
    // }

    const getData = async () => {
      try {
        let queryStock = await getStockToStore()
        queryStock.unshift(...stockIndex)
        const info = await getStocks(queryStock)
        setStocks(info)
      } catch (e) {
      }
    }
    // buildData()
    getData()
    setInterval(getData, 5000)
  }, [])

  return (
    <div className="flex flex-col z-0 ">
      <TopIndex stocks={stocks}></TopIndex>
      <StockList stocks={stocks} modalStatus={modalStatus!} setModalStatus={setModalStatus}></StockList>
      <Search modalStatus={modalStatus!} ></Search>
      <SettingModal modalStatus={modalStatus!} ></SettingModal>
      <BottomBar stock={stocks ? stocks[0] : undefined} modalStatus={modalStatus!} setModalStatus={setModalStatus}></BottomBar>
    </div >
  )
}

export default App

/*
 "SZ000516",
 "SH600078",
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
*/