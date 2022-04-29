import { fetch, ResponseType, Response } from "@tauri-apps/api/http"
import { XueqiuResp, XueqiuSearchResp } from "./type"

export interface StockDetail {
    name: string
    symbol: string
    now: number
    low: number
    high: number
    percent: number
    percentStr: string
    yesterday: number
    timestamp: number
    status: string,
    open: number,
    last_close: number,
    turnover_rate: number
    volume_ratio: number,
    limit_up: number
    limit_down: number
}

export interface StockMini {
    name: string
    symbol: string
}

let token: string = ''

export async function getToken(): Promise<string> {
    if (token !== '') return token

    const res = await fetch('https://xueqiu.com/', {
        method: "GET",
        responseType: ResponseType.Binary
    })

    const cookies: string[] = res.rawHeaders['set-cookie']
    const param: string = cookies.filter(key => key.includes('xq_a_token'))[0] || ''
    token = param.split(';')[0] || ''
    console.log("token", token)
    return token
}

export async function getStocks(code: string[]): Promise<StockDetail[] | undefined> {
    if (code.length === 0) return []

    const token = await getToken()

    const queryParam = code.join(',')
    const url = `https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=${queryParam}&extend=detail`

    console.log(url)
    let res: Response<XueqiuResp>
    try {
        res = await fetch<XueqiuResp>(url, {
            method: "GET",
            headers: {
                'Cookie': await getToken()
            }
        })
        return res.data.data.items.map(item => {
            const quote = item.quote
            const stock: StockDetail = {
                name: quote.name,
                symbol: quote.symbol,
                now: quote.current,
                low: quote.low!,
                high: quote.high!,
                percent: quote.percent,
                percentStr: getPercent(quote.percent),
                yesterday: quote.last_close,
                timestamp: quote.timestamp,
                status: item.market.status,
                open: quote.open!,
                last_close: quote.last_close,
                turnover_rate: quote.turnover_rate!,
                volume_ratio: quote.volume_ratio!,
                limit_up: quote.limit_up!,
                limit_down: quote.limit_down!,
            }
            return stock
        })
    } catch (e) {
        console.error(e)
    }
}

export async function searchStocks(key: string): Promise<StockMini[] | undefined> {

    const token = await getToken()

    const url = `https://xueqiu.com/stock/search.json?code=${encodeURIComponent(key)}`

    console.log("搜索", url)
    let res: Response<XueqiuSearchResp>
    try {
        res = await fetch<XueqiuSearchResp>(url, {
            method: "GET",
            headers: {
                'Cookie': await getToken()
            }
        })
        return res.data.stocks.filter((item => {
            if (item.code.includes("SH") || item.code.includes("SZ")) {
                return true
            }
        })

        ).map(item => {
            const stock: StockMini = {
                name: item.name,
                symbol: item.code,
            }
            return stock
        })
    } catch (e) {
        console.error(e)
    }
}

function getPercent(percent: number): string {
    if (!percent) {
        return `0.00`
    }
    if (percent >= 0) {
        return `+${percent.toFixed(2)}`
    } else {
        return percent.toFixed(2)
    }

}