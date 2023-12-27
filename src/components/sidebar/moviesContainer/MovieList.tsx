import Link from 'next/link'
import { FC } from 'react'

import MovieItem from './MovieItem'
import Styles from './MovieList.module.scss'
import { IMovieList } from './movie-list.interface'

const MovieList: FC<IMovieList> = ({ link, title, movies }) => {
	return (
		<div className={Styles.list}>
			<div className={Styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link className={Styles.button} href={link}>
				See more
			</Link>
		</div>
	)
}

export default MovieList
