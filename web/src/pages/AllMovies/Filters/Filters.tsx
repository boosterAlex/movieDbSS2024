import { useMemo } from 'react'

import { Button, NumberInput } from '@mantine/core'
import { Select, MultiSelect } from 'src/shared/ui'
import { SelectOption, TypeSetState } from 'src/types'

import { isDisabledResetFilter, generateYears } from './lib/helper'
import { SORTBY_VALUES, initFormValues } from './consts'

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

    console.log(typeof filters.ratingTo)

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
                    selectedValue={filters.releaseYear}
                    onChange={(value) => {
                        setFilters((prev) => ({
                            ...prev,
                            releaseYear: value
                        }))
                    }}
                    placeholder="Select release year"
                    className={styles.years}
                />
                <NumberInput
                    value={filters.ratingFrom}
                    label="Rating"
                    placeholder="From"
                    min={0}
                    max={
                        filters.ratingTo !== ''
                            ? Number(filters?.ratingFrom)
                            : 10
                    }
                    onChange={(value: number | string) => {
                        setFilters((prev) => ({
                            ...prev,
                            ratingFrom: value,
                            ratingTo:
                                value > prev.ratingTo &&
                                typeof prev.ratingTo !== 'string'
                                    ? value
                                    : prev.ratingTo
                        }))
                    }}
                    className={styles.ratingFrom}
                />
                <NumberInput
                    value={filters.ratingTo}
                    placeholder="To"
                    onChange={(value) => {
                        setFilters((prev) => ({
                            ...prev,
                            ratingTo: value,
                            ratingFrom:
                                value < prev.ratingFrom &&
                                typeof prev.ratingFrom !== 'string' &&
                                value !== ''
                                    ? value
                                    : prev.ratingFrom
                        }))
                    }}
                    min={
                        filters.ratingFrom !== ''
                            ? Number(filters?.ratingFrom)
                            : 0
                    }
                    max={10}
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
                    selectedValue={sortBy}
                    onChange={(value) => {
                        console.log(value)
                        setSortBy(value)
                    }}
                    className={styles.years}
                />
            </div>
        </>
    )
}

export default Filters
