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

export const stocksState = atom({
    key: "stocks",
    default: await getStockToStore() as string[]
})


export const backgroundBlurState = selector({
    key: 'backgroundBlur',
    get: ({ get }) => {
        const openSearch = get(openSearchState)
        const openSetting = get(openSettingState)
        if (openSearch || openSetting) {
            return true
        } else {
            return false
        }
    },
})

