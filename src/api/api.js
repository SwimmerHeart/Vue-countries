import {GET} from "@/api/fetch";

const baseUrl = 'https://www.cbr-xml-daily.ru/daily_json.js'
const baseUrlwithProxi = '/sbr/api/daily_json.js'
// proxi api/daily_json.js
// const testUrlErrors = 'https://statuscode.ir/403'
const testUrlErrors = 'https://swapi.dev/api/films/1111/'


export const getExchangeRate = async (time, options) => {
        return await GET(baseUrlwithProxi, {time}, options)
}
