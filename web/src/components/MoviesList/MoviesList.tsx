import { Pagination } from '@mantine/core'

import { useGenresQuery, useMoviesQuery } from 'src/services/api/api'

import { MovieCardData } from 'src/types'
import { MovieCard } from 'src/components/MovieCard'
import { Spinner } from 'src/shared/ui/Spinner'

const MovieList = () => {
    const { data, isLoading, isError } = useMoviesQuery()
    const { data: genres } = useGenresQuery()

    const generateGenres = (
        genresId: number[],
        genresArr: { id: number; name: string }[]
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
                data.map((movie: MovieCardData) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        poster_path={movie.poster_path}
                        original_title={movie.original_title}
                        release_date={movie.release_date}
                        vote_average={movie.vote_average}
                        vote_count={movie.vote_count}
                        genres={generateGenres(movie.genre_ids, genres)}
                    />
                ))
            )}

            <Pagination total={3} />
        </div>
    )
}

export default MovieList
