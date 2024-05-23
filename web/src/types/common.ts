import { Dispatch, SetStateAction } from 'react'

export interface SelectOption {
    id: number | string
    name: string
}

export interface FiltersState {
    genres: string[]
    releaseYear: string
    ratingFrom: number | string
    ratingTo: number | string
    sortBy: string
}

export enum SortOptions {
    MostPopular = 'popularity.desc',
    LeastPopular = 'popularity.asc',
    NewestReleases = 'primary_release_date.desc',
    OldestReleases = 'primary_release_date.asc',
    HighestRated = 'vote_average.desc',
    LowestRated = 'vote_average.asc',
    MostVotes = 'vote_count.desc',
    FewestVotes = 'vote_count.asc',
    TitleAZ = 'title.asc',
    TitleZA = 'title.desc'
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>
