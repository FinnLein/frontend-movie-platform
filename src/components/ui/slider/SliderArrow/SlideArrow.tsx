import cn from 'clsx'
import { FC } from 'react'

import { MaterialIcon } from '../../icons/MaterialIcon'

import styles from './SlideArrow.module.scss'

interface ISlideArrow {
	direction: 'right' | 'left'
	handleClick: () => void
}

const SlideArrow: FC<ISlideArrow> = ({ direction, handleClick }) => {
	const isLeft = direction === 'left'

	return (
		<button
			onClick={handleClick}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
		>
			{' '}
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	)
}

export default SlideArrow
