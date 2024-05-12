import axios from 'axios'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

import { BASE_URL } from './constants'

const api = axios.create({
    baseURL: BASE_URL
    // headers: {
    //     Authorization: options.headers.Authorization
    // }
})

export const useGenresQuery = () => {
    const get = () => api.get('/genre/movie/list?language=en')

    const results = useQuery({
        queryFn: get,
        queryKey: ['genres']
    })

    const tranformedResults = {
        ...results,
        data: results?.data?.data?.genres || []
    }

    return tranformedResults
}

export const useMoviesQuery = ({ genres = [] }: { genres?: string[] } = {}) => {
    const get = () =>
        api.get('/discover/movie', {
            params: {
                ...(genres?.length && { with_genres: genres.join(',') })
            }
        })

    const results = useQuery({
        queryFn: get,
        queryKey: ['movies']
    })

    const tranformedResults = {
        ...results,
        data: results?.data?.data.results || []
    }

    return tranformedResults
}
