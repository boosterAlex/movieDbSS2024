export interface MovieCardData {
    id: number
    original_title: string
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
    personalRating?: number
    genresStrList: string[]
}

export interface AboutMovieData {
    original_title: string
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
    runtime: number
    budget: number
    revenue: number
    genres: [{ id: number; name: string }]
    overview: string
    production_companies: [
        {
            id: number
            logo_path: string
            name: string
            origin_country: string
        }
    ]
}
