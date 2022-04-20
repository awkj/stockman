import dayjs from 'dayjs'

import { Stock } from "../api/xueqiu/api"

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