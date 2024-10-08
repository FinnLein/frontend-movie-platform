import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Gallery.module.scss'
import { IGallerItemProps } from './gallery.interface'

const GalleryItem: FC<IGallerItemProps> = ({ item, variant }) => {
	return (
		<Link href={item.link} className={cn(styles.item, {
			[styles.withText]: item.content,
			[styles.horizontal]: variant === 'horizontal',
			[styles.vertical]: variant === 'vertical',
		})}>
			<div
				
			>
				{' '}
				<Image
					alt={item.name}
					src={item.posterPath}
					draggable={false}
					fill
					priority
				/>
				{item.content && (
					<div className={styles.content}>
						<div className={styles.title}>{item.content.title}</div>
						{item.content.subTitle && (
							<div className={styles.subTitle}>{item.content.subTitle}</div>
						)}
					</div>
				)}
			</div>
		</Link>
	)
}

export default GalleryItem
