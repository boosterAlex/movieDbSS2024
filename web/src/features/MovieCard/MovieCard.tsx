import { generatePath, Link } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'

import { ROUTES } from 'src/shared/consts'
import { MovieCardData } from 'src/types'
import { formatNumber } from 'src/pages/AllMovies/Filters/lib/helper'
import RatingIcon from 'src/shared/assets/icon/rating'
import NoPoster from 'src/shared/assets/icon/NoPoster.svg'

import styles from './MovieCard.module.scss'
import { RatedModal } from './RatedModal'

interface Props {
    currentMovie: MovieCardData
    handleRemoveFromFavourite?: (movies: MovieCardData[]) => void
}

const MovieCard = ({ currentMovie, handleRemoveFromFavourite }: Props) => {
    const [ratingValue, setRatingValue] = useState<null | number>(null)
    const [opened, { open, close }] = useDisclosure(false)

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
        const ratedMovies = JSON.parse(
            localStorage.getItem('ratedMovies') as string
        )
        const findedMovie = ratedMovies.find((movie: MovieCardData) => {
            return movie.id === id
        })

        if (findedMovie) {
            setRatingValue(findedMovie.personalRating)
        }
    }, [id])

    const handleAddRating = (selectedRating: number) => {
        const ratedMovies = JSON.parse(
            localStorage.getItem('ratedMovies') as string
        )
        const existedMovieIndex = ratedMovies.findIndex(
            (movie: MovieCardData) => {
                return movie.id === currentMovie.id
            }
        )

        if (existedMovieIndex !== -1) {
            ratedMovies[existedMovieIndex] = {
                ...ratedMovies[existedMovieIndex],
                personalRating: selectedRating
            }
            localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies))
        } else {
            localStorage.setItem(
                'ratedMovies',
                JSON.stringify(
                    ratedMovies.concat({
                        ...currentMovie,
                        personalRating: selectedRating
                    })
                )
            )
        }

        setRatingValue(selectedRating)
    }

    const onRemoveFromFavourite = () => {
        const favouritesMovies = JSON.parse(
            localStorage.getItem('ratedMovies') as string
        )

        if (
            favouritesMovies.find(
                (movie: MovieCardData) => movie.id === currentMovie.id
            )
        ) {
            const filtered = favouritesMovies.filter(
                (movie: MovieCardData) => movie.id !== currentMovie.id
            )
            localStorage.setItem('ratedMovies', JSON.stringify(filtered))
            handleRemoveFromFavourite?.(filtered)
            setRatingValue(null)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {poster_path !== 'https://image.tmdb.org/t/p/w500null' ? (
                    <img
                        src={poster_path}
                        alt={original_title}
                        className={styles.poster}
                    />
                ) : (
                    <div className={styles.poster}>
                        <NoPoster />
                    </div>
                )}

                <div className={styles.generalInfo}>
                    <div className={styles.Info}>
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
                                {vote_average.toFixed(1)}
                            </span>
                            <span className={styles.voteCount}>
                                ({formatNumber(vote_count)})
                            </span>
                        </div>
                    </div>
                    <div className={styles.genres}>
                        <span>Genres</span>
                        {genresStrList?.join(', ')}
                    </div>
                </div>
            </div>

            <div className={styles.rated}>
                <RatingIcon
                    onClick={open}
                    className={styles.ratedStar}
                    color={ratingValue ? '#9854F6' : '#D5D6DC'}
                />
                {ratingValue && (
                    <span className={styles.ratingValue}>{ratingValue}</span>
                )}
            </div>
            <RatedModal
                movieTitle={original_title}
                removeButtonDisabled={!ratingValue}
                open={open}
                opened={opened}
                close={close}
                onSave={handleAddRating}
                personalRating={currentMovie.personalRating || ratingValue || 1}
                onRemove={onRemoveFromFavourite}
            />
        </div>
    )
}

export default MovieCard
