import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IMG_BASE_URL, options } from 'src/services/api/constants'

interface Movie {
    original_title: string
    homepage: string
    overview: string
    vote_average: number
    poster_path: string
    release_date: string
}

const AboutMovie = () => {
    const [data, setData] = useState<Movie | null>(null)

    const { id } = useParams()

    // console.log(data)

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
        )
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error(err))
    }, [id])

    return (
        <>
            {data && (
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
                        <a href={data?.homepage} target="_blank">
                            Homepage
                        </a>
                        <span>Release data: {data?.release_date}</span>
                        <h3>{data?.overview}</h3>
                        <span>Rating {data?.vote_average}</span>
                    </div>
                </>
            )}
        </>
    )
}

export default AboutMovie
