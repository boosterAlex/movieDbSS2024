import { useParams } from 'react-router-dom'
import { useMovieQuery } from 'src/services/api/api'

import { IMG_BASE_URL } from 'src/services/api/constants'
import { Spinner } from 'src/shared/ui'

const AboutMovie = () => {
    const { id } = useParams()

    const { data, isLoading, isFetching } = useMovieQuery(id)

    if (isLoading || isFetching) return <Spinner />

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={`${IMG_BASE_URL}${data?.poster_path}`}
                    alt={data?.original_title}
                    style={{ width: '150px' }}
                />
                <h1>{data?.original_title}</h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Release data: {data?.release_date}</span>
                <h3>{data?.overview}</h3>
                <span>Rating {data?.vote_average}</span>
            </div>
        </>
    )
}

export default AboutMovie
