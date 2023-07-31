import {GET} from "@/api/fetch";

const baseUrl = 'https://restcountries.com/v3.1/'
// const baseUrl = '/countries/api/'

const millisecondsInDay = 1000 * 60

const setHeadersWithTime = (time, options) => {
    const headers = {'custom-cache': time}
    return { ...options, headers }
}
export const getCountriesArrayLength = async (params, options) => {
    options = setHeadersWithTime(millisecondsInDay, options)

    const url = `${baseUrl}all?`
    const _params = {fields: 'name,capital,flags,population,region,currencies,cca3,' +
            'languages,timezones,borders', ...params}
    const CountriesList = await GET(url, _params, options)
    return CountriesList.length
}
async function getPagination(url, page, count, _params, options) {
        options = setHeadersWithTime(millisecondsInDay, options)
        const list = await GET(url, _params, options)
        const start = (page - 1) * count
        return list.slice(start, start + count)
}
export const getCountriesDataByName = async (name, params={}, options) => {
    options = setHeadersWithTime(millisecondsInDay, options)
    const _params = {name, ...params}
    const url = `${baseUrl}name/${name}?`
    let {page, count} = params
    if(page && count) {
        return getPagination(url, page, count, _params, options)
    } else return await GET(url, _params, options)
}
export const getCountriesDataAll = async (params={}, options) => {
    options = setHeadersWithTime(millisecondsInDay, options)
    const url = `${baseUrl}all?`
    const {page, count} = params
    const _params = {fields: 'name,capital,flags,population,region,currencies,cca3,' +
            'languages,timezones,borders', ...params}
    if(page && count) {
        return getPagination(url, page, count, _params, options)
    } else return await GET(url, _params, options)
}



