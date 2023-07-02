import {GET} from "@/api/fetch";


const baseUrlwithProxi = '/sbr/api/daily_json.js'
// proxi api/daily_json.js

export const getExchangeRate = async (time, options) => {
        return await GET(baseUrlwithProxi, {time}, options)
}

const baseUrl = 'https://restcountries.com/v2/'

export const allUrlBase = baseUrl + 'all?fields=name,capital,flag,population,region'
export const searchCountry = (name) => `${baseUrl}name/${name}`
export const filtersCountry = (codes) => `${baseUrl}alpha?codes=${codes.join(',')}`
