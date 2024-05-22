import { useMemo } from 'react'

import { Button } from '@mantine/core'
import { Select, MultiSelect } from 'src/shared/ui'
import { SelectOption, TypeSetState } from 'src/types'

import { generateYears } from './generateReleaseYears'
import { RATING_VALUES, initFormValues } from './consts'

export interface FiltersState {
    genres: string[]
    releaseYear: string
    ratingFrom: string
    ratingTo: string
    sortBy: string
}
interface Props {
    filters: FiltersState
    setFilters: TypeSetState<FiltersState>
    genres: SelectOption[]
    isGenresLoading: boolean
}

const Filters = ({ filters, setFilters, genres, isGenresLoading }: Props) => {
    const allYears = useMemo(() => generateYears(), [])

    function onClearFilters() {
        setFilters(initFormValues)
    }

    console.log('filters.ratingFrom', filters.ratingFrom)
    return (
        <>
            <div style={{ display: 'flex', gap: '16px' }}>
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
                    placeholder="Select genres"
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

                <Select
                    label="Ratings"
                    placeholder="Select rating from"
                    optionsData={RATING_VALUES}
                    selectedValues={filters.ratingFrom}
                    onChange={(value) => {
                        if (typeof value === 'string') {
                            setFilters((prev) => ({
                                ...prev,
                                ratingFrom: value
                            }))
                        }
                    }}
                />

                <Select
                    placeholder="Select rating to"
                    optionsData={RATING_VALUES}
                    selectedValues={filters.ratingTo}
                    onChange={(value) => {
                        if (typeof value === 'string') {
                            setFilters((prev) => ({
                                ...prev,
                                ratingTo: value
                            }))
                        }
                    }}
                    // style={{display:"flex", alignItems:"flex-end"}}
                />

                <Button variant="light" onClick={onClearFilters}>
                    Clear all
                </Button>
            </div>
        </>
    )
}

export default Filters
