"use client"

import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import { FC } from 'react'
import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'
const Favorites: FC = () => {
	const { favorites, isLoading } = useFavorites()

	return (
		<div>
			<Heading title='Favorites' />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favorites?.map(f => <FavoriteItem key={f._id} movie={f} />)
				)}
			</section>
		</div>
	)
}

export default Favorites
