import { FC } from 'react'
import styles from './CustomSelect.module.scss'

interface CustomPillProps extends React.ComponentPropsWithoutRef<'div'> {
    isLastIndex: boolean
    value: string
    onRemove?: () => void
}

const CustomPill: FC<CustomPillProps> = ({
    value,
    onRemove,
    isLastIndex,
    ...others
}) => {
    const renderValue = isLastIndex ? value : `${value},`

    return (
        <div className={styles.pill} {...others} onMouseDown={onRemove}>
            {renderValue}
        </div>
    )
}

export default CustomPill
