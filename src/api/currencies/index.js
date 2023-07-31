import {GET} from "@/api/fetch";

// const baseUrl = '/sbr/api/daily_json.js?'
const baseUrl = 'https://www.cbr-xml-daily.ru/daily_json.js?'
// proxi api/daily_json.js

const millisecondsInDay = 1000 * 60 * 60 * 24

const setHeadersWithTime = (time, options) => {
        const headers = {'custom-cache': time}
        return { ...options, headers }
}

export const getExchangeRate = async (time, options) => {
        options = setHeadersWithTime(millisecondsInDay, options)
        return await GET(baseUrl, {time}, options)
}



