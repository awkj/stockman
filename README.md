# Stockman



## Introduction

A Applicaion for display stock and encryption coin on mac menubar



## Feature
- [x]  status Bar
- [x]  click jump to xuqiu
- [x]  hidden scrobal on stock list
- [x]  ~~multi window~~
- [x]  top index
- [x]  search and add stock
- [ ]  support multi lanauage (English/简体中文/正體中文/にほんご)
- [ ]  add encryption coin and HongKong / USA / Taiwan / Japan stock
- [ ]  use recoil to manage react status



## Platforms
macOS Version > 10.12 (Sierra)



## Infrastructure

- Tauri（a similar like Electron, by base on rust and system webview)
- Typescript (You Know)
- Vite (fast and fast on develment)
- Rust (use on backend on tauri)
- React (UI manager)
- TailwindCSS (utility CSS)




## API

####  Upsort API

**1. Get stock index**

[https://upsort.com/all](https://upsort.com/all)

**2. Get index on A stock**

[https://upsort.com/pan](https://upsort.com/pan)

**3. Get message or news**

[https://upsort.com/msg](https://upsort.com/msg)



#### Xueqiu API

**1. Get stock price and status immediately**

[https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SZ002466&extend=detail](https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SZ002466&extend=detail)


**2. K line from xueqiu**

[https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=SH000979&period=1d](https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=SH000979&period=1d)



## Thanks

 The two projects to help me get the API

- [https://github.com/zhangxiangliang/stock-api](https://github.com/zhangxiangliang/stock-api)

- [https://upsort.com/](https://upsort.com/)
