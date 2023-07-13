import {GET} from "@/api/countries/fetch";

const baseUrl = 'https://restcountries.com/v3.1/'
const baseUrlwithProxi = '/sbr/api/daily_json.js'
// proxi api/daily_json.js

export const getCountriesData = async (name, params, options) => {
        if(name){
                const params={ fullText: true}
                const url = `${baseUrl}name/${name}?`
                return await GET(url, params, options)
        }
        else {
                const url = `${baseUrl}all?`
                const params = {
                        fields: 'name,capital,flags,population,region,currencies,cca3,' +
                            'languages,timezones,borders'
                }
                return await GET(url, params, options)
        }
}

export const allUrlBase = baseUrl + 'fields=name,capital,flags,population,region,currencies'
export const searchCountry = (name) => `${baseUrl}name/${name}`
export const filtersCountry = (codes) => `${baseUrl}alpha?codes=${codes.join(',')}`
