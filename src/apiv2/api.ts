import { fetch, ResponseType, Response } from "@tauri-apps/api/http"
import { XueqiuResp } from "./xueqiu"

export interface Stock {
    name: string
    symbol: string

    now: number
    low: number
    high: number
    percent: number
    percentStr: string
    yesterday: number
    timestamp: number
    status: string
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

export async function getStocks(code: string[]): Promise<Stock[] | undefined> {

    const token = await getToken()

    // https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,SH000688,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX
    const queryParam = code.join(',')
    const url = `https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=${queryParam}`
    // const url = `http://localhost:10100/v5/stock/batch/quote.json?symbol=SH000001`

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
            const stock: Stock = {
                name: quote.name,
                symbol: quote.symbol,
                now: quote.current,
                low: quote.low!,
                high: quote.high!,
                percent: quote.percent,
                percentStr: getPercent(quote.percent),
                yesterday: quote.last_close,
                timestamp: quote.timestamp,
                status: item.market.status

            }
            return stock
        })
    } catch (e) {
        console.error(e)
    }
}

function getPercent(percent: number): string {
    if (percent >= 0) {
        return `+${percent.toFixed(2)}`
    } else {
        return percent.toFixed(2)
    }

}