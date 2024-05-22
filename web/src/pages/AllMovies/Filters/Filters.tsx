import { useMemo } from 'react'

import { Button } from '@mantine/core'
import { Select, MultiSelect } from 'src/shared/ui'
import { SelectOption, TypeSetState } from 'src/types'

import { isDisabledResetFilter, generateYears } from './lib/helper'
import { RATING_VALUES, SORTBY_VALUES, initFormValues } from './consts'

import styles from './Filters.module.scss'
import { FiltersState } from 'src/types'
interface Props {
    sortBy: string
    filters: FiltersState
    setFilters: TypeSetState<FiltersState>
    setSortBy: TypeSetState<string>
    genres: SelectOption[]
    isGenresLoading: boolean
}

const Filters = ({
    filters,
    setFilters,
    sortBy,
    setSortBy,
    genres,
    isGenresLoading
}: Props) => {
    const allYears = useMemo(() => generateYears(), [])

    function onClearFilters() {
        setFilters(initFormValues)
    }

    return (
        <>
            <div className={styles.wrapper}>
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
                    className={styles.genres}
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
                    className={styles.years}
                />

                <Select
                    label="Ratings"
                    placeholder="From"
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
                    className={styles.ratingFrom}
                />

                <Select
                    placeholder="To"
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
                    className={styles.ratingTo}
                />
                <Button
                    className={styles.resetFilters}
                    disabled={isDisabledResetFilter(filters)}
                    variant="transparent"
                    onClick={onClearFilters}
                >
                    Reset filters
                </Button>
            </div>
            <div className={styles.wrapperSortBy}>
                <Select
                    label="Sort by"
                    optionsData={SORTBY_VALUES}
                    selectedValues={sortBy}
                    onChange={(value) => {
                        setSortBy(value)
                    }}
                    className={styles.years}
                />
            </div>
        </>
    )
}

export default Filters
