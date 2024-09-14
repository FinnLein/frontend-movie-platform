import { NextPage } from 'next'

import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import SingleMovie from '@/components/ui/single-movie/SingleMovie'

import { IPageSlugParam, TypeParamSlug } from '@/shared/types/page-params'

import { MovieService } from '@/services/movie/Movie.service'

import { getMovieUrl } from '@/configs/url.config'

import NotFound from '@/app/not-found'

export const revalidate = 60

export async function generateStaticParams() {
	const { data: movies } = await MovieService.getAll()

	const paths = movies.map((movie) => {
		return {
			params: { slug: movie.slug },
		}
	})

	return paths
}

const getSingleMovie = async (params: TypeParamSlug) => {
	const { data: movie } = await MovieService.getBySlug(params.slug as string)

	const { data: dataSimilarMovies } = await MovieService.getByGenres(
		movie.genres.map((g) => g._id)
	)

	const similarMovies: IGalleryItem[] = dataSimilarMovies
		.filter((m) => m._id !== movie._id)
		.map((m) => ({
			name: m.title,
			posterPath: m.poster,
			link: getMovieUrl(m.slug),
		}))

	return { movie, similarMovies }
}

const MoviePage: NextPage<IPageSlugParam> = async ({ params }) => {
	const { movie, similarMovies } = await getSingleMovie(params)

	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies} />
	) : (
		<NotFound />
	)
}

export default MoviePage
