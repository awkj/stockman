import dayjs from 'dayjs'
import { open as openURL } from '@tauri-apps/api/shell'
import { StockDetail } from "../api/xueqiu/api"
import { Store } from 'tauri-plugin-store-api'

const modalDom = document.getElementById('modal')

export default modalDom


const store = new Store('setting')

const configKey = "stocklist"

export async function getStockToStore() {
    const stockKey = await store.get<string>(configKey)
    console.log(stockKey)
    let stockList = []
    if (stockKey !== null) {
        stockList = JSON.parse(stockKey!)
    }
    return stockList
}

export async function saveStockToStore(stockList: string[]) {
    console.log("存储股票列表", stockList)
    await store.set(configKey, JSON.stringify(stockList))
    await store.save()
}


export function getBackgoundClass(percent: number) {
    if (percent === 0) {
        return `bg-neutral-700`
    }
    if (percent > 0) {
        return `bg-red-700`
    }
    return `bg-emerald-700`

}

export function getTextClassByDiff(value: number, base: number) {
    if (value === base) {
        return `text-neutral-700`
    } else if (value > base) {
        return `text-red-700`
    } else {
        return `text-emerald-700`
    }

}


export function getTextClass(percent: number) {
    if (percent === 0) {
        return `text-neutral-700`
    }
    if (percent > 0) {
        return `text-red-700`
    }
    return `text-emerald-700`
}


export function getTips(tips: string, stock: StockDetail | undefined) {
    if (tips) {
        return [tips, '']
    }

    if (!stock) {
        return ['', '']
    }


    // if (['休盘中', '已收盘', '休市'].includes(stock.status)) {
    if (stock.status !== '交易中') {
        return [stock?.status, 'bg-gray-600/80']
    }

    const text = '更新于: ' + getDate(stock?.timestamp || 0)
    return [text, 'bg-blue-600/80 text-xs']
}



function getDate(tm: number) {
    const refreshDate = dayjs(tm)
    return refreshDate.format('YYYY-MM-DD HH:mm:ss')
}

export async function openXueqiu(symbol: string) {
    console.log("symbol", symbol)
    await openURL(`https://xueqiu.com/S/${symbol}`)
}