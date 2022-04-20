
export interface Msg {
    id: number
    memo: string
    content: string
    summary: string
    create_time: string
    color: number
}

export interface UpSortMsgResp {
    code: number
    errMsg: string
    data: Msg[]
}


