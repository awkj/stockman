import { fetch, ResponseType, Response } from "@tauri-apps/api/http"
import { UpSortMsgResp, Msg } from "./type"

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

export async function getStocks(code: string[]): Promise<Msg[] | undefined> {

    const url = `https://upsort.com/msg`

    let res: Response<UpSortMsgResp>
    try {
        res = await fetch<UpSortMsgResp>(url, {
            method: "GET",
            headers: {
                'Cookie': await getToken()
            }
        })
        return res.data.data

    } catch (e) {
        console.error(e)
    }
}

