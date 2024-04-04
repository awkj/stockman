import {
    atom,
    selector,
} from 'recoil'
import { getStockToStore } from "./util"

export const modalState = atom({
    key: 'modalState',
    default: null as null | 'search' | 'setting' | 'coin'
})

export interface StockStatus {
    symbol: string
    expand: boolean
}

export const showExchange = atom({
    key: 'showExchange',
    default: ['']
})

const stocksSelector = selector({
    key: 'stocksStore',
    get: async ({ get }) => {
        const stockList = await getStockToStore() as StockStatus[]
        console.log("stockList", stockList)
        if (stockList == undefined) {
            return [] as StockStatus[]
        }
        const stockStatus = stockList.map(stock => {
            return {
                symbol: stock.symbol,
                expand: false
            }
        })
        return stockStatus
    }
})

export const stocksState = atom({
    key: "stocks",
    default: stocksSelector
})


export const backgroundBlurState = selector({
    key: 'backgroundBlur',
    get: ({ get }) => get(modalState) == 'search',
})

