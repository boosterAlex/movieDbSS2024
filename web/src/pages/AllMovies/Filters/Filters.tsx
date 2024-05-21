import { useMemo } from 'react'

import { Select, MultiSelect } from 'src/shared/ui'
import { SelectOption, TypeSetState } from 'src/types'

import { generateYears } from './generateReleaseYears'

interface Props {
    filters: {
        genres: string[]
        releaseYear: string
    }
    setFilters: TypeSetState<{
        genres: string[]
        releaseYear: string
    }>
    genres: SelectOption[]
    isGenresLoading: boolean
}
const Filters = ({ filters, setFilters, genres, isGenresLoading }: Props) => {
    const allYears = useMemo(() => generateYears(), [])

    return (
        <>
            <div style={{ display: 'flex' }}>
                <MultiSelect
                    label="Genres"
                    options={genres}
                    selectedValues={filters.genres}
                    disabled={isGenresLoading}
                    onRemove={(value) => {
                        setFilters((prev) => ({
                            ...prev,
                            genres: prev.genres.filter((v) => v !== value)
                        }))
                    }}
                    onChange={(value) => {
                        setFilters((prev) => ({
                            ...prev,
                            genres: [...prev.genres, value]
                        }))
                    }}
                />
                <Select
                    label="Release year"
                    optionsData={allYears}
                    selectedValues={filters.releaseYear}
                    onChange={(value) => {
                        setFilters((prev) => ({
                            ...prev,
                            releaseYear: value
                        }))
                    }}
                    placeholder="Select release year"
                />
            </div>
        </>
    )
}

export default Filters
