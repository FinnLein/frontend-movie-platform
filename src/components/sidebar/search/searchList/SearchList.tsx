import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import { getMovieUrl } from '@/configs/url.config'

import Styles from './SearchList.module.scss'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={Styles.list}>
			{movies.length ? (
				movies.map((movie) => (
					<Link href={getMovieUrl(movie.slug)} key={movie._id}>
						<Image
							alt={movie.title}
							src={movie.poster}
							width={50}
							height={50}
							objectFit="cover"
							objectPosition="top"
							draggable={false}
							priority={true}
						/>
						<span>{movie.title}</span>
					</Link>
				))
			) : (
				<div className="text-white text-clip my-4">Movies not found</div>
			)}
		</div>
	)
}

export default SearchList
