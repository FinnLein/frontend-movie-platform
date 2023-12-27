import { FC } from 'react'

import { MovieService } from '@/services/movie/Movie.service'

import PopularMovies from './PopularMovies'
import FavoriteMovies from './favoriteMovies/FavoriteMovies'


const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			<FavoriteMovies />
		</div>
	)
}

export default MoviesContainer
