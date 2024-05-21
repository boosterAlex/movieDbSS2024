import { Link } from 'react-router-dom'

import { LogoIcon } from 'src/shared/assets/icon'
import { ROUTES } from 'src/shared/consts'

import styles from './logo.module.scss'

const Logo = () => {
    return (
        <Link to={ROUTES.MAIN} className={styles.logo}>
            <LogoIcon />
            <span>ArrowFlicks</span>
        </Link>
    )
}

export default Logo
