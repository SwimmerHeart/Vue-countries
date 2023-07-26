import {GET} from "@/api/fetch";

// const baseUrl = '/sbr/api/daily_json.js?'
const baseUrl = 'https://www.cbr-xml-daily.ru/daily_json.js?'
// proxi api/daily_json.js

export const getExchangeRate = async (time, options) => {
        return await GET(baseUrl, {time}, options)
}



