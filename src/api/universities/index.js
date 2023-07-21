import {GET} from "@/api/fetch"

const baseUrl = 'http://universities.hipolabs.com/search?'
const baseUrlwithProxi = '/universities/api/search?'
// http://universities.hipolabs.com/search?country=Russian%20Federation

async function getResultsPromises (shortName, longName, options) {
    const promises = [
        GET(baseUrl, {country: shortName}, options),
        GET(baseUrl, {country: longName}, options)]
    const results = await Promise.allSettled(promises)
    return results
        .filter(item => item.status === 'fulfilled')
        .map(item => item.value)
        .reduce((acc, arr) => acc.concat(arr), [])
}

export const getUniversitiesCountByName = async (name, options) => {
    const {shortName, longName} = name
    const listAll = await getResultsPromises(shortName, longName, options)
    return listAll.length
}

export const getUniversitiesDataByName = async (name, params, options) => {
    const _params = {country: name}
    const list = await GET(baseUrl, _params, options)
    // console.log('list', list)
    const {page, count} = params
    const start = (page - 1) * count
    return list.slice(start, start + count)
}
export const getUniversitiesDataAllByName = async (shortName, longName, params, options) => {
    const listAll = await getResultsPromises(shortName, longName, options)
    const {page, count} = params
    console.log(params)
    const start = (page - 1) * count
    console.log('start', start)
    console.log('listAll', listAll.slice(start, start + Number(count)))
    return listAll.slice(start, start + Number(count))
}


