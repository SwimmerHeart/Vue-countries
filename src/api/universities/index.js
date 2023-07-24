import {GET} from "@/api/fetch"

// const baseUrl = 'http://universities.hipolabs.com/search?'
const baseUrl = '/universities/api/search?'
// http://universities.hipolabs.com/search?country=Russian%20Federation

async function getResultsPromises (shortName, longName, options) {
    const promises = [
        GET(baseUrl, {country: shortName}, options),
        GET(baseUrl, {country: longName}, options)]
    const results = await Promise.allSettled(promises)
    console.log('results', results)
    // const res = []
    // const temp = results
    //     .filter(item => item.status === 'fulfilled')
    //     .map(item => item.value)
    // console.log('res', temp.filter((arr)=>{
    //     res.push(!res.includes(arr))
    // }))
    // console.log(res)
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

export const getUniversitiesDataByName = async (name, params={}, options) => {
    const _params = {country: name}
    const list = await GET(baseUrl, _params, options)
    const {page, count} = params
    if(page && count) {
        const start = (page - 1) * count
        return list.slice(start, start + count)
    } else return await GET(baseUrl, _params, options)
}
export const getUniversitiesDataAllByName = async (shortName, longName, params={}, options) => {
    const listAll = await getResultsPromises(shortName, longName, options)
    console.log('listAll', listAll)
    const {page, count} = params
    if(page && count) {
        const start = (page - 1) * count
        return listAll.slice(start, start + Number(count))
    } else return await GET(baseUrl, params, options)
}


