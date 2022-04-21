import dayjs from 'dayjs'
import { open as openURL } from '@tauri-apps/api/shell'

import { Stock } from "../api/xueqiu/api"
import { Store } from 'tauri-plugin-store-api'

const store = new Store('setting')

export async function addStockToStore(stockNum: string) {
    const stockKey = await store.get<string>('stocks')
    let stockList = []
    if (stockKey !== null) {
        stockList = JSON.parse(stockKey!)
    }
    stockList.push(stockNum)
    stockList = [...new Set(stockList)]
    await store.set('stocks', JSON.stringify(stockList))
    await store.save()
}

export async function getStockToStore() {
    const stockKey = await store.get<string>('stocks')
    console.log(stockKey)
    let stockList = []
    if (stockKey !== null) {
        stockList = JSON.parse(stockKey!)
    }
    return stockList
}

export async function saveStockToStore(stockList: string[]) {
    console.log("执行保存")
    await store.set('stocks', JSON.stringify(stockList))
    await store.save()
}

export function getBackgoundClass(percent: number) {
    if (percent === 0) {
        return `bg-neutral-500`
    }
    if (percent > 0) {
        return `bg-red-700`
    }
    return `bg-emerald-700`

}

export function getTextClass(percent: number) {
    if (percent === 0) {
        return `text-neutral-500`
    }
    if (percent > 0) {
        return `text-red-700`
    }
    return `text-emerald-700`
}


export function getTips(tips: string, stock: Stock | undefined) {
    if (tips) {
        return [tips, '']
    }

    if (!stock) {
        return ['', '']
    }


    if (['休盘中', '已收盘'].includes(stock.status)) {
        return [stock?.status, 'bg-gray-600/80']
    }

    const text = '更新于: ' + getDate(stock?.timestamp || 0)
    return [text, 'bg-blue-600/90 text-xs']
}



function getDate(tm: number) {
    const refreshDate = dayjs(tm)
    return refreshDate.format('YYYY-MM-DD HH:mm:ss')
}

export async function openXueqiu(symbol: string) {
    console.log("symbol", symbol)
    await openURL(`https://xueqiu.com/S/${symbol}`)
}