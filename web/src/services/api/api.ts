import axios from 'axios'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

import { BASE_URL, IMG_BASE_URL } from './constants'
import { MovieCardData } from 'src/types'

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
        data:
            results?.data?.data.results.map((movie: MovieCardData) => {
                return {
                    id: movie.id,
                    original_title: movie.original_title,
                    poster_path:
                        movie.poster_path === null
                            ? 'src/shared/assets/img/NoPoster.png'
                            : `${IMG_BASE_URL}${movie.poster_path}`,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    genre_ids: movie.genre_ids
                }
            }) || []
    }

    return tranformedResults
}
