import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { BASE_URL, IMG_BASE_URL } from './constants'
import { MovieCardData, SelectOption } from 'src/types'
import { AboutMovieData } from 'src/types/movie'

const api = axios.create({
    baseURL: BASE_URL
})

const createYouTubeLink = (videoKey: string | undefined) => {
    if (!videoKey) return null
    return 'https://www.youtube.com/embed/' + videoKey
}

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

export const useMovieQuery = (id: string | undefined) => {
    const get = () =>
        api.get(`movie/${id}`, {
            params: {
                append_to_response: 'videos'
            }
        })

    return useQuery({
        queryFn: get,
        queryKey: ['movie'],
        select: ({ data }: { data: AboutMovieData }) => {
            return {
                id: data.id,
                original_title: data.original_title,
                poster_path: `${IMG_BASE_URL}${data.poster_path}`,
                release_date: data.release_date,
                vote_average: data.vote_average,
                vote_count: data.vote_count,
                runtime: data.runtime,
                budget: data.budget,
                revenue: data.revenue,
                genres: data.genres,
                overview: data.overview,
                production_companies: data.production_companies,
                trailerUrl: createYouTubeLink(data.videos?.results[0]?.key)
            }
        }
    })
}

export const useMoviesQuery = ({
    genres,
    releaseYear = '',
    activePage = 1,
    genresList,
    sortBy,
    ratingFrom,
    ratingTo
}: {
    genres?: string[]
    releaseYear?: string
    activePage?: number
    genresList: SelectOption[]
    sortBy: string
    ratingFrom: number | string
    ratingTo: number | string
}) => {
    const generateGenres = (
        genresId: number[],
        genresArr: { id: number | string; name: string }[]
    ) => {
        const genres: string[] = []

        genresId.map((id) => {
            genresArr.map((genre) => {
                if (id === genre.id) {
                    genres.push(genre.name)
                }
            })
        })

        return genres.slice(0, 3)
    }

    const get = () =>
        api.get('/discover/movie', {
            params: {
                ...(genres?.length && { with_genres: genres.join(',') }),
                ...(releaseYear && {
                    'primary_release_date.gte': `${releaseYear}-01-01`
                }),
                ...(releaseYear && {
                    'primary_release_date.lte': `${releaseYear}-12-31`
                }),
                ...(activePage && { page: activePage.toString() }),
                ...(sortBy && { sort_by: sortBy }),
                ...(ratingFrom && { 'vote_average.gte': ratingFrom }),
                ...(ratingTo && { 'vote_average.lte': ratingTo })
            }
        })

    return useQuery({
        queryFn: get,
        queryKey: ['movies'],
        select: (data) => {
            const { data: movies } = data
            return (
                {
                    totalPages:
                        data?.data?.total_pages >= 500
                            ? 500
                            : data.data.total_pages,
                    movies:
                        movies.results.map((movie: MovieCardData) => {
                            return {
                                id: movie.id,
                                original_title: movie.original_title,
                                poster_path:
                                    movie.poster_path === null
                                        ? 'src/shared/assets/icon/NoPoster.svg'
                                        : `${IMG_BASE_URL}${movie.poster_path}`,
                                release_date: movie.release_date,
                                vote_average: movie.vote_average,
                                vote_count: movie.vote_count,
                                genre_ids: movie.genre_ids,
                                genresStrList: generateGenres(
                                    movie.genre_ids,
                                    genresList
                                )
                            }
                        }) || []
                } || []
            )
        }
    })
}
