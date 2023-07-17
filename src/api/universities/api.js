import {GET} from "@/api/universities/fetch";

const baseUrl = 'http://universities.hipolabs.com/search?'
const baseUrlwithProxi = '/universities/api/search?'
// http://universities.hipolabs.com/search?country=Russian%20Federation
export const getUniversitiesDataByName = async (name, params, options) => {
        const _params = { country: name }
        // return await GET(baseUrl, params, options)
        const list = await GET(baseUrl, params, options)
}
export const getUniversitiesDataAllByName = async (shortName, longName, params, options) => {
        const _params = { country: name }
        // return await GET(baseUrl, params, options)
        const list1 = await getUniversitiesDataByName(shortName)
        const list2 = await getUniversitiesDataByName(longName)
        const list = [...list1, ...list2]
        const {page, count} = params
        const start = page * count
        return list.slice(start, start + count)
}


