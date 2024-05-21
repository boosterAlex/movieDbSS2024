import { Box, Grid, Pagination } from '@mantine/core'
import { Title } from '@mantine/core'
import { useState, useEffect } from 'react'

import { useMoviesQuery, useGenresQuery } from 'src/services/api/api'
import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/features'
import { Spinner } from 'src/shared/ui/Spinner'

import { Filters } from './Filters'

import styles from './AllMovie.module.scss'

const AllMovies = () => {
    const { data: genres, isLoading: isGenresLoading } = useGenresQuery()

    const [filters, setFilters] = useState<{
        genres: string[]
        releaseYear: string
    }>({ genres: [], releaseYear: '' })
    const [activePage, setPage] = useState(1)
    const { refetch, data, isLoading } = useMoviesQuery({
        ...filters,
        genresList: genres,
        activePage
    })

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, activePage])

    return (
        <>
            <Title fz="32px" fw="700" lh="150%" lts="2">
                Movies
            </Title>

            <Filters
                genres={genres}
                isGenresLoading={isGenresLoading}
                filters={filters}
                setFilters={setFilters}
            />
            {data?.movies.length ? (
                <>
                    <Box maw="1440px" m="0 auto">
                        <Grid columns={2}>
                            {isLoading ? (
                                <Spinner />
                            ) : (
                                data?.movies?.map((movie: MovieCardData) => (
                                    <MovieCard
                                        key={movie.id}
                                        currentMovie={movie}
                                    />
                                ))
                            )}
                        </Grid>

                        <Pagination
                            total={data?.totalPages}
                            value={activePage}
                            onChange={(val) => {
                                setPage(val)
                            }}
                            mt="sm"
                        />
                    </Box>
                </>
            ) : (
                <Box maw="1440px" m="0 auto" className={styles.emptyData}>
                    <img
                        src="src/shared/assets/img/dontSuch.png"
                        alt="dontSuch"
                    />
                    <span>We don't have such movies, look for another one</span>
                </Box>
            )}
        </>
    )
}

export default AllMovies
