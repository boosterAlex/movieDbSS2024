export interface MovieCardData {
    id: number
    original_title: string
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
    genresStrList: string[]
}

export interface MovieData {
    original_title: string
    homepage: string
    overview: string
    vote_average: number
    poster_path: string
    release_date: string
}
