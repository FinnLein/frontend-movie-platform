import { NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IPageSlugParam, TypeParamSlug } from '@/shared/types/page-params'

import { ActorsService } from '@/services/actors/Actors.service'
import { MovieService } from '@/services/movie/Movie.service'

export const revalidate = 60

export const generateStaticParams = async () => {
	const { data: actors } = await ActorsService.getAll()

	const paths = actors.map((actor) => {
		return {
			params: { slug: actor.slug },
		}
	})

	return paths
}

const getActors = async (params: TypeParamSlug) => {
	const { data: actor } = await ActorsService.getBySlug(params.slug as string)

	const { data: movies } = await MovieService.getByActors(actor._id)

	return { actor, movies }
}

const ActorPage: NextPage<IPageSlugParam> = async ({ params }) => {
	const { actor, movies } = await getActors(params)

	return <Catalog movies={movies || []} title={actor.name} />
}

export default ActorPage
