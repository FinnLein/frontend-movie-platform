import FavoriteButton from '@/components/ui/single-movie/FavoriteButton/FavoriteButton'
import { getMovieUrl } from '@/configs/url.config'
import { IMovie } from '@/shared/types/movie.types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Favorites.module.scss'

const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.itemWrapper}>
			<FavoriteButton movieId={movie._id} />
			<Link className={styles.item} href={getMovieUrl(movie.slug)}>
				<Image
					src={movie.bigPoster}
					alt={movie.title}
					layout='fill'
					draggable={false}
					priority
				/>
				<div className={styles.title}>{movie.title}</div>
			</Link>
		</div>
	)
}

export default FavoriteItem
