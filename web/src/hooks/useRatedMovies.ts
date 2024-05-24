import { useState, useEffect } from 'react'
import { MovieCardData } from 'src/types/index.ts'

const useRatedMovies = () => {
    const [ratedMovies, setRatedMoviesState] = useState<MovieCardData[]>([])

    useEffect(() => {
        const storedMovies = localStorage.getItem('ratedMovies')
        if (storedMovies) {
            setRatedMoviesState(JSON.parse(storedMovies))
        }
    }, [])

    const setRatedMovies = (movies: MovieCardData[]) => {
        localStorage.setItem('ratedMovies', JSON.stringify(movies))
        setRatedMoviesState(movies)
    }

    const isMovieInRated = (id: string | undefined) => {
        if (!id) return false
        return ratedMovies.some((movie) => movie.id === Number(id))
    }

    const getPersonalRating = (id: string | undefined) => {
        if (!id) return null
        const movie = ratedMovies.find((movie) => movie.id === Number(id))
        return movie?.personalRating
    }

    return { ratedMovies, setRatedMovies, isMovieInRated, getPersonalRating }
}

export default useRatedMovies
