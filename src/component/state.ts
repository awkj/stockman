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

const stocksSelector = selector({
    key: 'stocksSelector',
    get: async ({ get }) => {
        return await getStockToStore() as string[]
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

