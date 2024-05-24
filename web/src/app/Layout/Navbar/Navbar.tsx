import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { Logo } from 'src/shared/ui'

import { navItems } from './navItems'
import styles from './Navbar.module.scss'

const Navbar = () => {
    const { pathname } = useLocation()

    const isActive = (path: string) => {
        if (path !== '/') {
            return pathname.startsWith(path)
        }
        return pathname === path || pathname.startsWith('/movie')
    }

    return (
        <aside className={styles.wrapper}>
            <Logo />
            <div className={styles.linksContainer}>
                {navItems.map((item) => {
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
                })}
            </div>
        </aside>
    )
}

export default Navbar
