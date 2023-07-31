import {GET} from "@/api/fetch"

const baseUrl = 'http://universities.hipolabs.com/search?'
// const baseUrl = '/universities/api/search?'
// http://universities.hipolabs.com/search?country=Russian%20Federation
const millisecondsInDay = 1000 * 60 * 60 * 24

const setHeadersWithTime = (time, options) => {
    const headers = {'custom-cache': time}
    return { ...options, headers }
}

async function getResultsPromises(shortName, longName, options) {
    options = setHeadersWithTime(millisecondsInDay, options)
    const promises = [
        GET(baseUrl, {country: shortName}, options),
        GET(baseUrl, {country: longName}, options)]
    const results = await Promise.allSettled(promises)
    const resultsAllCountries = results
        .filter(item => item.status === 'fulfilled')
        .map(item => item.value)
        .reduce((acc, arr) => acc.concat(arr), [])
    return Array.from(new Set(resultsAllCountries.map(item => JSON.stringify(item))))
        .map(item => JSON.parse(item))
}

export const getUniversitiesCountByName = async (name, options) => {
    options = setHeadersWithTime(millisecondsInDay, options)
    const {shortName, longName} = name
    const listAll = await getResultsPromises(shortName, longName, options)
    return listAll.length
}

export const getUniversitiesDataByName = async (name, params = {}, options) => {
    options = setHeadersWithTime(millisecondsInDay, options)
    const _params = {country: name}
    const list = await GET(baseUrl, _params, options)
    const {page, count} = params
    if (page && count) {
        const start = (page - 1) * count
        return list.slice(start, start + count)
    } else return list
}
export const getUniversitiesDataAllByName = async (shortName, longName, params = {}, options) => {
    options = setHeadersWithTime(millisecondsInDay, options)
    const listAll = await getResultsPromises(shortName, longName, options)
    const {page, count} = params
    if (page && count) {
        const start = (page - 1) * count
        return listAll.slice(start, start + Number(count))
    } else return listAll
}


