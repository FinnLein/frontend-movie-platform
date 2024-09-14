import { getGenreUrl } from '@/configs/url.config'
import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import { ICollection } from './collections.interface'
import styles from './Collections.module.scss'
import CollectionsImage from './CollectionsImage'

const CollectionsItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getGenreUrl(collection.slug)} className={styles.collection}>
			<CollectionsImage collection={collection} />
			<div className={styles.content}>
				<div className={styles.title}>{collection.title}</div>
			</div>
			<div className={cn(styles.behind, styles.second)}>
				<CollectionsImage collection={collection} />
			</div>
			<div className={cn(styles.behind, styles.third)}>
				<CollectionsImage collection={collection} />
			</div>
		</Link>
	)
}

export default CollectionsItem
