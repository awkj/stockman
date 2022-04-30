import {
    atom,
    selector,
} from 'recoil'
import { getStockToStore } from "./util"

export const openSearchState = atom({
    key: 'openSearchState',
    default: false,
})

export const openSettingState = atom({
    key: 'openSettingState',
    default: false,
})

export const openCoinState = atom({
    key: 'openCoinState',
    default: false,
})

export interface StockStatus {
    symbol: string
    expand: boolean
}

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
    get: ({ get }) => {
        const openSearch = get(openSearchState)
        const openSetting = get(openSettingState)
        const openCoin = get(openCoinState)
        if (openSearch || openSetting || openCoin) {
            return true
        } else {
            return false
        }
    },
})

