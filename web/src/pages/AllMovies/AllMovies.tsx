import { Box, Grid, Pagination } from '@mantine/core'
import { Title } from '@mantine/core'
import { useState, useEffect } from 'react'

import { useMoviesQuery, useGenresQuery } from 'src/services/api/api'
import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/features'
import { Spinner } from 'src/shared/ui/Spinner'

import DontSuch from 'src/shared/assets/icon/DontSuch.svg'
import { FiltersState } from 'src/types'

import { Filters } from './Filters'

import styles from './AllMovie.module.scss'

import { initFormValues } from './Filters/consts'

const AllMovies = () => {
    const { data: genres, isLoading: isGenresLoading } = useGenresQuery()

    const [filters, setFilters] = useState<FiltersState>(initFormValues)
    const [sortBy, setSortBy] = useState('Most Popular')
    const [activePage, setPage] = useState(1)
    const { refetch, data, isLoading } = useMoviesQuery({
        ...filters,
        genresList: genres,
        activePage
    })

    const getSiblings = () => {
        if (data?.totalPages <= 3) return 0
        if (activePage === 1 || activePage === data?.totalPages) return 0
        return 1
    }

    const getBoundaries = () => {
        if (data?.totalPages <= 3) return 0
        if (activePage === 1 || activePage === data?.totalPages) return 1
        return 0
    }

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
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            {isLoading && <Spinner />}
            {data?.movies.length > 0 && (
                <Box maw="1440px" m="0 auto" className={styles.wrapper}>
                    <Grid columns={2}>
                        {data?.movies?.map((movie: MovieCardData) => (
                            <MovieCard key={movie.id} currentMovie={movie} />
                        ))}
                    </Grid>
                    <Pagination
                        className={styles.pagination}
                        classNames={{ dots: styles.hideDots }}
                        total={data?.totalPages}
                        value={activePage}
                        siblings={getSiblings()}
                        boundaries={getBoundaries()}
                        onChange={(val) => {
                            setPage(val)
                        }}
                        mt="sm"
                    />
                </Box>
            )}
            {!isLoading && data?.movies?.length === 0 && (
                <Box maw="1440px" m="0 auto" className={styles.emptyData}>
                    <DontSuch />
                    <span>We don't have such movies, look for another one</span>
                </Box>
            )}
        </>
    )
}

export default AllMovies
