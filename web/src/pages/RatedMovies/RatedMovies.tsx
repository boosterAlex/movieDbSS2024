import { Input, Button } from '@mantine/core'

import styles from './rated.module.scss'

const RatedMovies = () => {
    return (
        <>
            <Input
                placeholder="Regular Input component"
                className={styles.input}
                radius={'8px'}
            />
            <Button variant="filled" radius={'8px'} size="xs">
                Button
            </Button>
        </>
    )
}

export default RatedMovies
