import { Dispatch, SetStateAction } from 'react'

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface SelectOption {
    id: number
    name: string
}

export interface MovieCardData {
    id: number
    original_title: string
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
}
