import { ROUTES } from 'src/shared/consts'

interface Menu {
    link: string
    label: string
}

export const data: Menu[] = [
    {
        link: ROUTES.MAIN,
        label: 'Movies'
    },
    {
        link: ROUTES.RATED,
        label: 'Rated movies'
    }
]
