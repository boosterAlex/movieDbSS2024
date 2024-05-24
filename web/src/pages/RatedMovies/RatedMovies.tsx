import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/features'
import { useEffect, useState } from 'react'
import { Box, Button, Grid, Input, Pagination, Title } from '@mantine/core'

import DontSuch from 'src/shared/assets/icon/DontSuch.svg'
import EmptyState from 'src/shared/assets/icon/EmptyState.svg'

import styles from './RatedMovies.module.scss'

const MAX_MOVIES_ON_PAGE = 4

function filterSearch(text: string, query: string): boolean {
    return text.toLowerCase().includes(query.toLowerCase())
}

const RatedMovies = () => {
    const [allMovies, setAllMovies] = useState<MovieCardData[]>(
        JSON.parse(localStorage.getItem('ratedMovies') as string)
    )

    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if (filter === '') {
            setAllMovies(
                JSON.parse(localStorage.getItem('ratedMovies') as string)
            )
        }
    }, [filter])

    const handleRemove = (data: MovieCardData[]) => {
        const actualTotalPages = Math.ceil(data.length / MAX_MOVIES_ON_PAGE)

        if (currentPage > actualTotalPages) {
            setCurrentPage(actualTotalPages)
        }
        setAllMovies(data)
    }

    const onSearch = () => {
        if (filter === '') {
            setAllMovies(
                JSON.parse(localStorage.getItem('ratedMovies') as string)
            )
        } else {
            const movies: MovieCardData[] = JSON.parse(
                localStorage.getItem('ratedMovies') as string
            )
            setCurrentPage(1)
            setAllMovies(
                movies.filter((item) =>
                    filterSearch(item.original_title, filter)
                )
            )
        }
    }

    const currentMovies = allMovies.slice(
        (currentPage - 1) * MAX_MOVIES_ON_PAGE,
        currentPage * MAX_MOVIES_ON_PAGE
    )

    return (
        <>
            {allMovies.length === 0 ? (
                <Box maw="1440px" m="0 auto" className={styles.emptyData}>
                    <EmptyState />
                    <span style={{ marginTop: '40px' }}>
                        You haven't rated any films yet
                    </span>
                </Box>
            ) : (
                <Box>
                    <Box className={styles.wrapperHeader}>
                        <Title fz="32px" fw="700" lh="150%" lts="2">
                            Rated movies
                        </Title>
                        <Box className={styles.wrapperInput}>
                            <Input
                                size="md"
                                className={styles.input}
                                value={filter}
                                onChange={(event) =>
                                    setFilter(event.target.value.trim())
                                }
                                placeholder="Search movie title"
                            />
                            <Button
                                className={styles.searchButton}
                                size="xs"
                                onClick={onSearch}
                            >
                                Search
                            </Button>
                        </Box>
                    </Box>
                    {currentMovies.length === 0 && !allMovies.length && (
                        <Box
                            maw="1440px"
                            m="0 auto"
                            className={styles.emptyData}
                        >
                            <DontSuch />
                            <span style={{ marginTop: '40px' }}>
                                We don't have such movies, look for another one
                            </span>
                        </Box>
                    )}
                    <Box className={styles.wrapperMovies}>
                        <Grid columns={2}>
                            {currentMovies.map((movie: MovieCardData) => {
                                return (
                                    <MovieCard
                                        key={movie.id}
                                        currentMovie={movie}
                                        handleRemoveFromFavourite={(data) =>
                                            handleRemove(data)
                                        }
                                    />
                                )
                            })}
                        </Grid>
                    </Box>
                    {allMovies.length > MAX_MOVIES_ON_PAGE && (
                        <Box className={styles.pagination}>
                            <Pagination
                                total={Math.ceil(
                                    allMovies.length / MAX_MOVIES_ON_PAGE
                                )}
                                value={currentPage}
                                onChange={(val) => {
                                    setCurrentPage(val)
                                }}
                                mt="sm"
                            />
                        </Box>
                    )}
                </Box>
            )}
        </>
    )
}

export default RatedMovies
