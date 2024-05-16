import { generatePath, Link } from 'react-router-dom'

import { ROUTES } from 'src/shared/consts'
import { MovieCardData } from 'src/types'

import styles from './MovieCard.module.scss'
import RatingIcon from 'src/shared/assets/icon/rating'
import { useEffect, useState } from 'react'

interface Props {
    currentMovie: MovieCardData
}

const MovieCard = ({ currentMovie }: Props) => {
    const [isRated, setIsRated] = useState(false)

    const {
        id,
        poster_path,
        original_title,
        release_date,
        vote_average,
        vote_count,
        genresStrList
    } = currentMovie

    useEffect(() => {
        const favouritesMovies = JSON.parse(
            localStorage.getItem('rated') as string
        )

        setIsRated(
            !!favouritesMovies.find((favouriteMovie: MovieCardData) => {
                return favouriteMovie.id === id
            })
        )
    }, [])

    const handleToggleFafourite = () => {
        const favouritesMovies = JSON.parse(
            localStorage.getItem('rated') as string
        )

        if (
            favouritesMovies.find((movie: MovieCardData) => {
                return movie.id === currentMovie.id
            })
        ) {
            localStorage.setItem(
                'rated',
                JSON.stringify(
                    favouritesMovies.filter(
                        (movie: MovieCardData) => movie.id !== currentMovie.id
                    )
                )
            )
            setIsRated(false)
        } else {
            localStorage.setItem(
                'rated',
                JSON.stringify(favouritesMovies.concat(currentMovie))
            )
            setIsRated(true)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <img
                    src={poster_path}
                    alt={original_title}
                    className={styles.poster}
                />
                <div>
                    <Link
                        className={styles.title}
                        key={id}
                        to={generatePath(ROUTES.MOVIE, {
                            id: String(id)
                        })}
                    >
                        {original_title}
                    </Link>
                    <p className={styles.releaseYear}>
                        {release_date.split('-')[0]}
                    </p>
                    <div className={styles.rating}>
                        <RatingIcon
                            color="#FAB005"
                            style={{ width: '23.3px' }}
                        />
                        <span className={styles.ratingValue}>
                            {vote_average.toFixed(1)} ({vote_count})
                        </span>
                    </div>
                    <p className={styles.genres}>
                        Genres {genresStrList?.join(', ')}
                    </p>
                </div>
            </div>
            <div onClick={handleToggleFafourite}>
                <RatingIcon
                    className={styles.rated}
                    color={isRated ? '#9854F6' : '#D5D6DC'}
                />
            </div>
        </div>
    )
}

export default MovieCard
