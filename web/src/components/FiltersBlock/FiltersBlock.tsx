import { Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { CustomSelect } from 'src/components/CustomSelect'

import { useGenresQuery, useMoviesQuery } from 'src/services/api/api'
import { generateYears } from './lib/generateReleaseYears'

const FiltersBlock = () => {
    const { data, isLoading, isError } = useGenresQuery()

    const [genres, setGenres] = useState<string[]>([])
    const [releaseYear, setReleaseYear] = useState<string[]>([])

    console.log(data)

    const allYears = generateYears()

    const { refetch } = useMoviesQuery({ genres, releaseYear })

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genres, releaseYear])

    return (
        <>
            <Title fz="32px" fw="700" lh="150%" lts="2">
                Movies
            </Title>
            <div style={{ display: 'flex' }}>
                <CustomSelect
                    disabled={isLoading || isError}
                    style={{ width: '283.67px' }}
                    label="Genres"
                    optionsData={data}
                    isMulti
                    selectedValues={genres}
                    setSelectedValues={setGenres}
                    placeholder="Select genre"
                />
                <CustomSelect
                    disabled={isLoading || isError}
                    style={{ width: '283.67px' }}
                    label="Release year"
                    optionsData={allYears}
                    selectedValues={releaseYear}
                    setSelectedValues={setReleaseYear}
                    placeholder="Select release year"
                />
            </div>
        </>
    )
}

export default FiltersBlock
