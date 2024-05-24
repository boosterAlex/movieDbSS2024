import { Button } from '@mantine/core'
import { Navbar } from 'src/app/Layout/Navbar'

import styles from './EmptyState.module.scss'

const EmptyState = () => {
    return (
        <>
            <Navbar />
            <Button className={styles.button}></Button>
        </>
    )
}

export default EmptyState
