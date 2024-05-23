import { SelectOption } from 'src/types'
import { SortOptions } from 'src/types/common'

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

export const SORT_LABELS: { [key in SortOptions]: string } = {
    [SortOptions.MostPopular]: 'Most Popular',
    [SortOptions.LeastPopular]: 'Least Popular',
    [SortOptions.NewestReleases]: 'Newest Releases',
    [SortOptions.OldestReleases]: 'Oldest Releases',
    [SortOptions.HighestRated]: 'Highest Rated',
    [SortOptions.LowestRated]: 'Lowest Rated',
    [SortOptions.MostVotes]: 'Most Votes',
    [SortOptions.FewestVotes]: 'Fewest Votes',
    [SortOptions.TitleAZ]: 'Title A-Z',
    [SortOptions.TitleZA]: 'Title Z-A'
}

export const SORTBY_VALUES = Object.keys(SortOptions).map((key) => {
    const id = SortOptions[key as keyof typeof SortOptions]
    const name = SORT_LABELS[id]
    return { id, name }
})

export const initFormValues = {
    genres: [],
    releaseYear: '',
    ratingFrom: '',
    ratingTo: '',
    sortBy: ''
}
