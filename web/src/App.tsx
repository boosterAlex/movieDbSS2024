import { PublicRoutes } from './app/routes'

import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './style'
import { useEffect } from 'react'

function App() {
    useEffect(() => {
        const localStorageData = localStorage.getItem('rated')

        if (!localStorageData) {
            localStorage.setItem('rated', JSON.stringify([]))
        }
    }, [])

    return (
        <>
            <MantineProvider theme={theme}>
                <PublicRoutes />
            </MantineProvider>
        </>
    )
}

export default App
