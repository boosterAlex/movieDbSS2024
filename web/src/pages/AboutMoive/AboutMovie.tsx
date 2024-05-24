import { useParams } from 'react-router-dom'
import cn from 'classnames'
import { Divider } from '@mantine/core'

import { useMovieQuery } from 'src/services/api/api'
import { IMG_BASE_URL } from 'src/services/api/constants'
import { Spinner } from 'src/shared/ui'
import RatingIcon from 'src/shared/assets/icon/rating'

import styles from './AboutMovie.module.scss'
import {
    formatCurrency,
    formatDate,
    formatNumber,
    formatTime,
    getYearFromDate
} from 'src/pages/AllMovies/Filters/lib/helper.ts'
import useRatedMovies from 'src/hooks/useRatedMovies'
import { useEffect, useMemo, useState } from 'react'
import { RatedModal } from 'src/features/MovieCard/RatedModal/index.ts'
import { MovieCardData } from 'src/types/index.ts'

const AboutMovie = () => {
    const { id } = useParams()

    const { data, isLoading, isFetching } = useMovieQuery(id)
    const { isMovieInRated, setRatedMovies, getPersonalRating } =
        useRatedMovies()
    const [isInRated, setIsInRated] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false)

    const OPTIONS_LIST = useMemo(
        () => [
            { label: 'Duration', value: formatTime(data?.runtime) },
            { label: 'Premiere', value: formatDate(data?.release_date) },
            { label: 'Budget', value: formatCurrency(data?.budget) },
            { label: 'Gross worldwide', value: formatCurrency(data?.revenue) },
            {
                label: 'Genres',
                value: data?.genres
                    ?.slice(0, 3)
                    .map((genre) => genre.name)
                    .join(', ')
            }
        ],
        [data]
    )

    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
    }

    const handleAddRating = (selectedRating: number) => {
        const ratedMovies = JSON.parse(
            localStorage.getItem('ratedMovies') as string
        )
        const existedMovieIndex = ratedMovies.findIndex(
            (movie: MovieCardData) => {
                return movie.id === Number(id)
            }
        )

        if (existedMovieIndex !== -1) {
            ratedMovies[existedMovieIndex] = {
                ...ratedMovies[existedMovieIndex],
                personalRating: selectedRating
            }
            setRatedMovies(ratedMovies)
        } else {
            setRatedMovies(
                ratedMovies.concat({
                    ...data,
                    personalRating: selectedRating
                })
            )
        }
        setIsInRated(true)
    }

    const onRemoveFromFavourite = () => {
        const favouritesMovies = JSON.parse(
            localStorage.getItem('ratedMovies') as string
        )

        if (isMovieInRated(id)) {
            const filtered = favouritesMovies.filter(
                (movie: MovieCardData) => movie.id !== Number(id)
            )
            setRatedMovies(filtered)
            setIsInRated(false)
        }
    }

    useEffect(() => {
        setIsInRated(isMovieInRated(id))
    }, [id, isMovieInRated])

    if (isLoading || isFetching) return <Spinner />
    return (
        <>
            <div className={styles.container}>
                <div className={styles.movieContainer}>
                    <div className={styles.imageContainer}>
                        <img
                            src={`${IMG_BASE_URL}${data?.poster_path}`}
                            alt={data?.original_title}
                            loading="lazy"
                        />
                    </div>
                    <div className={styles.info}>
                        <div>
                            <span className={styles.title}>
                                {data?.original_title}
                            </span>
                            <span className={styles.year}>
                                {getYearFromDate(data?.release_date)}
                            </span>
                            <div className={styles.ratingContainer}>
                                <RatingIcon color="#FAB005" />
                                <span className={styles.average}>
                                    {data?.vote_average.toFixed(1)}
                                </span>
                                <span
                                    className={styles.greyText}
                                >{`(${formatNumber(data?.vote_count || '')})`}</span>
                            </div>
                        </div>
                        <div className={styles.description}>
                            {data && (
                                <ul className={styles.listContainer}>
                                    {OPTIONS_LIST.map((item) => (
                                        <li
                                            className={styles.listOption}
                                            key={item.label}
                                        >
                                            <span
                                                className={cn(
                                                    styles.greyText,
                                                    styles.label
                                                )}
                                            >
                                                {item.label}:
                                            </span>
                                            <span
                                                className={cn(
                                                    styles.greyText,
                                                    styles.optionValue
                                                )}
                                            >
                                                {item.value || 'N/A'}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    onClick={handleOpenModal}
                    className={styles.ratingStarContainer}
                >
                    <RatingIcon color={isInRated ? '#9854F6' : '#D5D6DC'} />
                    {getPersonalRating(id) && (
                        <span>{getPersonalRating(id)}</span>
                    )}
                </div>
            </div>

            <div className={cn(styles.container, styles.columnContainer)}>
                {data?.trailerUrl && (
                    <div className={styles.trailerContainer}>
                        <span className={styles.infoTitle}>Trailer</span>
                        <iframe
                            src={data.trailerUrl}
                            title="YouTube video player"
                            allowFullScreen
                            className={styles.trailer}
                        />
                        <Divider my="lg" className={styles.divider} />
                    </div>
                )}
                <div className={styles.descriptionContainer}>
                    <span className={styles.infoTitle}>Description</span>
                    <div className={styles.descriptionText}>
                        {data?.overview}
                    </div>
                    <Divider my="lg" className={styles.divider} />
                </div>
                <div className={styles.productionContainer}>
                    <span className={styles.infoTitle}>Production</span>
                    <div className={styles.production}>
                        <ul className={styles.listContainer}>
                            {data?.production_companies.map((company) => (
                                <li
                                    className={styles.productionOption}
                                    key={company.name}
                                >
                                    <div
                                        key={company.id}
                                        className={styles.company}
                                    >
                                        <img
                                            src={`${IMG_BASE_URL}${company.logo_path}`}
                                            alt={company.name}
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className={styles.companyText}>
                                        {company.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <RatedModal
                movieTitle={data?.original_title || 'N/A'}
                removeButtonDisabled={!isInRated}
                open={open}
                opened={isModalVisible}
                close={handleCloseModal}
                onSave={handleAddRating}
                personalRating={Number(getPersonalRating(id))}
                onRemove={onRemoveFromFavourite}
            />
        </>
    )
}

export default AboutMovie
