import {GET} from "@/api/fetch";

const baseUrl = 'https://restcountries.com/v3.1/all'
const baseUrlwithProxi = '/sbr/api/daily_json.js'
// proxi api/daily_json.js

export const getCountriesData = async (url, options) => {
        const params = { fields: 'name,capital,flags,population,region,currencies' }
        return await GET(baseUrl, params, options)
}

export const allUrlBase = baseUrl + 'fields=name,capital,flags,population,region,currencies'
export const searchCountry = (name) => `${baseUrl}name/${name}`
export const filtersCountry = (codes) => `${baseUrl}alpha?codes=${codes.join(',')}`
