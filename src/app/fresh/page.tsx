import { NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie/Movie.service'

export const revalidate = 60

const getMovies = async () => {
	const {data: movies} = await MovieService.getAll()
	return movies
}

const FreshPage: NextPage = async () => {
	const moviesData = await getMovies()

	return (
		<Catalog
			movies={moviesData || []}
			title="Fresh movies"
			description="New movies and seriese in excellent quality: legal, safe, without ads"
		/>
	)
}

export default FreshPage
