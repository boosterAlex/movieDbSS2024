import { generatePath, Link } from 'react-router-dom'
import { Rating } from '@mantine/core'

import { ROUTES } from 'src/shared/consts'
import { MovieCardData } from 'src/types'

import styles from './MovieCard.module.scss'
import RatingIcon from 'src/shared/assets/icon/rating'
import classNames from 'classnames'

interface Props extends Omit<MovieCardData, 'genre_ids'> {
    genres: string[]
}

const MovieCard = ({
    id,
    poster_path,
    original_title,
    release_date,
    vote_average,
    vote_count,
    genres
}: Props) => {
    return (
        <div className={styles.wrapper}>
            <img
                src={poster_path}
                alt={original_title}
                className={styles.poster}
            />
            <div className={styles.content}>
                <Link
                    key={id}
                    to={generatePath(ROUTES.MOVIE, {
                        id: String(id)
                    })}
                >
                    {original_title}
                </Link>
                <p className="movie-card__release-year">
                    Release Year: {release_date.split('-')[0]}
                </p>
                <div className="movie-card__rating">
                    <RatingIcon style={{ width: '23.3px' }} />
                    <span className="movie-card__rating-value">
                        {vote_average.toFixed(1)} ({vote_count})
                    </span>
                </div>
                <p className="movie-card__genres">
                    Genres: {genres.join(', ')}
                </p>
            </div>
            <div>
                <Rating count={1} size="lg" />
            </div>
        </div>
    )
}

export default MovieCard
