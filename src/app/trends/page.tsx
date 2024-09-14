import { NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie/Movie.service'

const getTrendingMovies = async () => {
	const trendingsMovies = await MovieService.getMostPopular()

	return trendingsMovies
}

const TrendsPage: NextPage = async () => {
	const dataTrendingsMovies = await getTrendingMovies()

	return (
		<Catalog
			movies={dataTrendingsMovies}
			title="Trends now"
			description="Trending movies and seriese in excellent quality: legal, safe, without ads"
		/>
	)
}

export default TrendsPage
