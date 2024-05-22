import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

import NotFound from 'src/shared/assets/img/404.svg'
import { ROUTES } from 'src/shared/consts'
import { Logo } from 'src/shared/ui'

import styles from './Page404.module.scss'

const Page404 = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.content}>
                <NotFound />
                <span className={styles.span}>
                    We can’t find the page you are looking for
                </span>
                <Link to={ROUTES.MAIN}>
                    <Button>Go home</Button>
                </Link>
            </div>
        </div>
    )
}

export default Page404
