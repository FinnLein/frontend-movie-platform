import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { MaterialIcon } from '@/components/ui/icons/MaterialIcon'

import { IMovie } from '@/shared/types/movie.types'

import { getGenresListEach } from '@/utils/movie/getGenresListEach'

import { getGenreUrl, getMovieUrl } from '@/configs/url.config'

import Styles from './MovieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={Styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					alt={movie.title}
					draggable={false}
					src={movie.poster}
					width={65}
					height={97}
					priority={true}
				/>
			</Link>
			<div className={Styles.info}>
				<div>
					<div className={Styles.title}>{movie.title}</div>
					<div className={Styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link key={genre._id} href={getGenreUrl(genre.slug)}>
								{getGenresListEach(idx, movie.genres.length, genre.name)}
							</Link>
						))}
					</div>
				</div>

				<div className={Styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem

