import { Pagination } from '@mantine/core'

import { useMoviesQuery } from 'src/services/api/api'

import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/components/MovieCard'
import { Spinner } from 'src/shared/ui/Spinner'

const MovieList = () => {
    const { data, isLoading } = useMoviesQuery()

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            {isLoading ? (
                <Spinner />
            ) : (
                data &&
                data.map((movie: MovieCardData) => {
                    return <MovieCard key={movie.id} currentMovie={movie} />
                })
            )}
            <Pagination total={3} />
        </div>
    )
}

export default MovieList
