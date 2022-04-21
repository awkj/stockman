
export interface Market {
    status_id: number
    region: string
    status: string
    time_zone: string
    time_zone_desc?: any
    delay_tag: number
}

export interface Quote {
    symbol: string
    code: string
    exchange: string
    name: string
    type: number
    sub_type: string
    status: number
    current: number
    currency: string
    percent: number
    chg: number
    timestamp: any
    time: any
    lot_size: number
    tick_size: number
    open?: number
    last_close: number
    high?: number
    low?: number
    avg_price?: number
    volume?: number
    amount?: number
    turnover_rate?: number
    amplitude?: number
    market_capital?: number
    float_market_capital?: number
    total_shares?: number
    float_shares: any
    issue_date: any
    lock_set?: number
    current_year_percent: number
    high52w: number
    low52w: number
    rise_count?: number
    flat_count?: number
    fall_count?: number
    volume_ratio?: number
    limit_up?: number
    limit_down?: number
    eps?: number
    pe_ttm?: number
    pe_forecast?: number
    pe_lyr?: number
    navps?: number
    pb?: number
    dividend?: number
    dividend_yield?: number
    profit?: number
    profit_four?: number
    profit_forecast?: number
    pledge_ratio?: number
    goodwill_in_net_assets?: number
    timestamp_ext?: number
    current_ext?: number
    volume_ext?: number
    traded_amount_ext?: number
    no_profit: string
    no_profit_desc: string
    weighted_voting_rights: string
    weighted_voting_rights_desc: string
    is_registration: string
    is_registration_desc: string
    is_vie: string
    is_vie_desc: string
    security_status: string
    up_limit_count?: number
    down_limit_count?: number
    insuboutl?: number
    top_stock_symbol: string
    top_stock_name: string
    percent5m?: number
    percent5d?: number
    week_percent?: any
    month_percent?: any
    three_month_percent?: any
    half_year_percent?: any
    top_nsymbols: string
    bottom_nsymbols: string
    variable_tick_size: string
    psr?: number
    shareholder_funds?: number
    short_ratio?: any
    inst_hld?: any
    beta?: any
    percent_ext?: number
    chg_ext?: number
    contract_size?: number
}

export interface Others {
    cyb_switch: boolean
}

export interface Item {
    market: Market
    quote: Quote
    others: Others
    tags: any[]
}

export interface Data {
    items: Item[]
    items_size: number
}

export interface XueqiuResp {
    data: Data
    error_code: number
    error_description: string
}

export interface Stock {
    code: string
    name: string
    enName: string
    hasexist: string
    flag?: any
    type: number
    stock_id: number
    ind_id: number
    ind_name: string
    ind_color?: any
    _source: string
}


export interface XueqiuSearchResp {
    stocks: Stock[]
    error_code: number
    error_description: string
}
