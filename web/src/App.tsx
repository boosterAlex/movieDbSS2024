import { PublicRoutes } from './app/routes'

import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './style'

function App() {
    return (
        <>
            <MantineProvider theme={theme}>
                <PublicRoutes />
            </MantineProvider>
        </>
    )
}

export default App
