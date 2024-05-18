import { Box, Grid, Pagination } from '@mantine/core'

import { useMoviesQuery } from 'src/services/api/api'

import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/components/MovieCard'
import { Spinner } from 'src/shared/ui/Spinner'

const MovieList = () => {
    const { data, isLoading } = useMoviesQuery()

    return (
        <Box maw="1160px" m="auto">
            <Grid columns={2}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    data &&
                    data.map((movie: MovieCardData) => {
                        return <MovieCard key={movie.id} currentMovie={movie} />
                    })
                )}
            </Grid>
            <Pagination total={3} />
        </Box>
    )
}

export default MovieList
