import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

// import { ROUTES } from 'src/shared/consts'

import { Logo } from './Logo'

import { data } from './Menu.data'

import styles from './navbar.module.scss'

const Navbar = () => {
    const curentPath = useLocation().pathname

    const isActive = (path: string) => {
        if (path !== '/') {
            return curentPath.startsWith(path)
        }
        return curentPath === path || curentPath.startsWith('/movie')
    }

    const items = data.map((item) => {
        return (
            <Link
                key={item.label}
                to={item.link}
                className={classNames(styles.navlink, {
                    [styles.active]: isActive(item.link)
                })}
            >
                {item.label}
            </Link>
        )
    })

    return (
        <aside className={styles.wrapper}>
            <Logo />
            {items}
        </aside>
    )
}

export default Navbar
