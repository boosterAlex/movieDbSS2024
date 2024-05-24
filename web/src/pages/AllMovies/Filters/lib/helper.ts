export const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const startYear = 1888
    const years = []

    for (let year = startYear; year <= currentYear; year++) {
        years.push({ id: year.toString(), name: year.toString() })
    }

    return years.reverse()
}
export const isDisabledResetFilter = (obj: any) => {
    const keys = Object.keys(obj)

    let isDisabled = true

    keys.forEach((key) => {
        if (typeof obj[key] === 'number' && obj[key] >= 0) {
            isDisabled = false
        } else if (obj[key].length) {
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

export const getYearFromDate = (date: string | undefined) => {
    if (!date) {
        return 'N/A'
    }
    return new Date(date).getFullYear()
}

export const formatTime = (minutes: number | undefined): string => {
    if (minutes === undefined) return 'N/A'

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    const hoursString = hours < 10 ? `${hours}` : `${hours}`
    const minutesString =
        remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`

    return `${hoursString}h ${minutesString}m`
}

export const formatDate = (dateString: string | undefined) => {
    if (dateString === undefined) return 'N/A'
    const date = new Date(dateString)

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
}

export const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) return 'N/A'

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    return formatter.format(amount)
}
