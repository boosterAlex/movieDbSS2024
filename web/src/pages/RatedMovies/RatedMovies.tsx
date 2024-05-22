import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/features'

// import styles from './rated.module.scss'
import { useState } from 'react'
import { Button, Input, Pagination, Title } from '@mantine/core'

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

    const currentMovies = allMovies.slice(
        (currentPage - 1) * MAX_MOVIES_ON_PAGE,
        currentPage * MAX_MOVIES_ON_PAGE
    )

    return (
        <>
            <Title fz="32px" fw="700" lh="150%" lts="2">
                Rated movies
            </Title>
            <Input
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Search movie title"
            />
            <Button
                onClick={() => {
                    if (filter.trim() == '') {
                        setAllMovies(
                            JSON.parse(
                                localStorage.getItem('ratedMovies') as string
                            )
                        )
                    } else {
                        setAllMovies((pre) => {
                            return pre.filter((item) =>
                                filterSearch(item.original_title, filter)
                            )
                        })
                    }
                }}
            >
                Search
            </Button>
            {currentMovies.map((movie: MovieCardData) => {
                return (
                    <MovieCard
                        key={movie.id}
                        currentMovie={movie}
                        handleRemoveFromFavourite={(data: MovieCardData[]) => {
                            setAllMovies(data)
                        }}
                    />
                )
            })}

            <Pagination
                total={Math.ceil(allMovies.length / MAX_MOVIES_ON_PAGE)}
                value={currentPage}
                onChange={(val) => {
                    setCurrentPage(val)
                }}
                mt="sm"
            />
        </>
    )
}

export default RatedMovies
