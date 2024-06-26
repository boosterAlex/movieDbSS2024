import { Link } from 'react-router-dom'

import LogoIcon from 'src/shared/assets/icon/logo.svg'
import { ROUTES } from 'src/shared/consts'

import styles from './Logo.module.scss'

const Logo = () => {
    return (
        <Link to={ROUTES.MAIN} className={styles.logo}>
            <LogoIcon />
            <span>ArrowFlicks</span>
        </Link>
    )
}

export default Logo
