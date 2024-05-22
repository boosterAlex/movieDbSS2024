import { SelectOption } from 'src/types'

export const RATING_VALUES: SelectOption[] = [
    { id: 0, name: '0' },
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' }
]
export const SORTBY_VALUES = [
    { id: 0, name: 'Most Popular' },
    { id: 1, name: 'Least Popular' },
    { id: 2, name: 'Most Rated' },
    { id: 3, name: 'Least Rated' },
    { id: 4, name: 'Most Voted' },
    { id: 5, name: 'Least Voted' }
]

export const initFormValues = {
    genres: [],
    releaseYear: '',
    ratingFrom: '',
    ratingTo: '',
    sortBy: ''
}
