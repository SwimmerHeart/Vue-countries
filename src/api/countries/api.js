import {GET} from "@/api/countries/fetch";

const baseUrl = 'https://restcountries.com/v3.1/'
const baseUrlwithProxi = '/countries/api/'


export const getCountriesDataByName = async (name, params, options) => {
    if (name) {
        const _params = {fullText: true, ...params}
        const url = `${baseUrl}name/${name}?`
        return await GET(url, _params, options)
    }
}
export const getCountriesDataAllByName = async (params, options) => {
    const url = `${baseUrl}all?`
    const _params = params ? {fields: params} : {
        fields: 'name,capital,flags,population,region,currencies,cca3,' +
            'languages,timezones,borders'}

    return await GET(url, _params, options)
}



