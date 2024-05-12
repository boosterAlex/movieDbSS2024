import { generatePath, Link } from 'react-router-dom'

import { FiltersBlock } from 'src/components/FiltersBlock'
import { useMoviesQuery } from 'src/services/api/api'

import { IMG_BASE_URL, options } from 'src/services/api/constants'
import { ROUTES } from 'src/shared/consts'

interface Movie {
    id: number
    title: string
    poster_path: string
}

const AboutMovie = () => {
    const { data, isLoading, isError } = useMoviesQuery()

    return (
        <>
            <FiltersBlock />
            {data &&
                data.map((movie: Movie) => {
                    return (
                        <ul key={movie.id}>
                            <li>
                                <div>
                                    <Link
                                        key={movie.id}
                                        to={generatePath(ROUTES.MOVIE, {
                                            id: String(movie.id)
                                        })}
                                    >
                                        {movie.title}
                                    </Link>
                                    <img
                                        src={`${IMG_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                        style={{ width: '100px' }}
                                    />
                                </div>
                            </li>
                        </ul>
                    )
                })}
        </>
    )
}

export default AboutMovie
