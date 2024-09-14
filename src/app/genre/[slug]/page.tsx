import { NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IPageSlugParam, TypeParamSlug } from '@/shared/types/page-params'

import { GenreService } from '@/services/genre/Genre.service'
import { MovieService } from '@/services/movie/Movie.service'

export const revalidate = 60

export async function generateStaticParams() {
	const { data: genres } = await GenreService.getAll()

	const paths = genres.map(genre => {
		return {
			params: { slug: genre.slug }
		}
	})

	return paths
}

const getMoviesByGenre = async (params: TypeParamSlug) => {
	const { data: genre } = await GenreService.getBySlug(params.slug as string)
	const { data: movies } = await MovieService.getByGenres([genre._id])

	return { movies, genre }
}

const GenrePage: NextPage<IPageSlugParam> = async ({ params }) => {
	const { movies, genre } = await getMoviesByGenre(params)

	return (
		<Catalog
			movies={movies || []}
			title={genre.name}
			description={genre.description}
		/>
	)
}

export default GenrePage
