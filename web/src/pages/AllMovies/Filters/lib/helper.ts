import { FiltersState } from 'src/types/common'

export const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const startYear = 1888
    const years = []

    for (let year = startYear; year <= currentYear; year++) {
        years.push({ id: year, name: year.toString() })
    }

    return years.reverse()
}

export const isDisabledResetFilter = (obj: FiltersState) => {
    const keys = Object.keys(obj)

    let isDisabled = true

    keys.forEach((key) => {
        if (obj[key].length) {
            isDisabled = false
        }
    })
    return isDisabled
}
