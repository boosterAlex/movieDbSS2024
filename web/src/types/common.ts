import { Dispatch, SetStateAction } from 'react'

export interface SelectOption {
    id: number
    name: string
}

export interface FiltersState {
    genres: string[]
    releaseYear: string
    ratingFrom: string
    ratingTo: string
    sortBy: string
    [key: string]: string | string[]
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>
