import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/features'

// import styles from './rated.module.scss'
import { useState } from 'react'
import { Title } from '@mantine/core'

const RatedMovies = () => {
    const [ratedMovies, setRatedMovies] = useState<MovieCardData[]>(
        JSON.parse(localStorage.getItem('ratedMovies') as string)
    )

    return (
        <>
            <Title fz="32px" fw="700" lh="150%" lts="2">
                Rated movies
            </Title>
            {ratedMovies &&
                ratedMovies.map((movie: MovieCardData) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            currentMovie={movie}
                            handleRemoveFromFavourite={(
                                movies: MovieCardData[]
                            ) => {
                                setRatedMovies(movies)
                            }}
                        />
                    )
                })}
        </>
    )
}

export default RatedMovies
