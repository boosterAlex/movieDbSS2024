import { Button } from '@mantine/core'

import { NotFound } from 'src/shared/assets/img'
import { Logo } from 'src/app/Layout/Navbar/Logo'

import styles from './Page404.module.scss'
import { Link } from 'react-router-dom'
import { ROUTES } from 'src/shared/consts'

const Page404 = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.content}>
                <NotFound className={styles.img} />
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
