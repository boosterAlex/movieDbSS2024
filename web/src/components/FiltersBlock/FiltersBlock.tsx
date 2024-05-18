import { Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { CustomSelect } from 'src/components/CustomSelect'

import { useGenresQuery, useMoviesQuery } from 'src/services/api/api'

const FiltersBlock = () => {
    const { data, isLoading, isError } = useGenresQuery()

    const [genres, setGenres] = useState<string[]>([])
    // const [years, setYears] = useState<SelectOption[]>([])

    const { refetch } = useMoviesQuery({ genres })

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genres])

    return (
        <>
            <Title fz="32px" fw="700" lh="150%" lts="2">
                Movies
            </Title>
            <CustomSelect
                disabled={isLoading || isError}
                style={{ width: '300px' }}
                label="Genres"
                optionsData={data}
                isMulti
                selectedValues={genres}
                setSelectedValues={setGenres}
            />
            {/* <CustomSelect
                style={{ width: '500px' }}
                label="Years"
                optionsData={genres}
                selectedValues={years}
                setSelectedValues={setYears}
            /> */}
        </>
    )
}

export default FiltersBlock
