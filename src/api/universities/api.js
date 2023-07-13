import {GET} from "@/api/universities/fetch";

const baseUrl = 'http://universities.hipolabs.com/search?'
// http://universities.hipolabs.com/search?country=Russian%20Federation
export const getUniversitiesData = async (name, options) => {
        const params = { country: name }
        return await GET(baseUrl, params, options)
}

export const allUrlBase = baseUrl + 'fields=name,capital,flags,population,region,currencies'
export const searchCountry = (name) => `${baseUrl}search?/${name}`
export const filtersCountry = (codes) => `${baseUrl}alpha?codes=${codes.join(',')}`
