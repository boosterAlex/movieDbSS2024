import { FiltersState } from 'src/types/common'

export const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const startYear = 1888
    const years = []

    for (let year = startYear; year <= currentYear; year++) {
        years.push({ id: year.toString(), name: year.toString() })
    }

    return years.reverse()
}

export const isDisabledResetFilter = (obj: FiltersState) => {
    const keys = Object.keys(obj)

    let isDisabled = true

    keys.forEach((key) => {
        if (typeof obj[key] === 'number' && obj[key] >= 0) {
            isDisabled = false
        } else if (Array.isArray(obj[key]) && obj[key].length > 0) {
            isDisabled = false
        } else if (typeof obj[key] === 'string' && obj[key].length > 0) {
            isDisabled = false
        }
    })

    return isDisabled
}

export const formatNumber = (num: number | string): string => {
    if (typeof num !== 'number') {
        return '0'
    }

    if (num < 1000) {
        return num.toString()
    } else if (num >= 1000 && num < 1000000) {
        let formatted = (num / 1000).toFixed(1)
        if (formatted.endsWith('.0')) {
            formatted = formatted.slice(0, -2)
        }
        return formatted + 'K'
    } else {
        let formatted = (num / 1000000).toFixed(1)
        if (formatted.endsWith('.0')) {
            formatted = formatted.slice(0, -2)
        }
        return formatted + 'M'
    }
}
