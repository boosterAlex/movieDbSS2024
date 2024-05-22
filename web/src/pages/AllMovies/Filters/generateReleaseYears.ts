export const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const startYear = 1888
    const years = []

    for (let year = startYear; year <= currentYear; year++) {
        years.push({ id: year, name: year.toString() })
    }

    return years.reverse()
}
