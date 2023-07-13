import {GET} from "@/api/currencies/fetch";

const baseUrlwithProxi = '/sbr/api/daily_json.js'
// proxi api/daily_json.js

export const getExchangeRate = async (time, options) => {
        return await GET(baseUrlwithProxi, {time}, options)
}



