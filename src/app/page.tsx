import { Metadata, NextPage } from 'next'

import Home from '@/components/screens/Home/Home'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slidet.interface'

import { ActorsService } from '@/services/actors/Actors.service'
import { MovieService } from '@/services/movie/Movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'

import { getActorUrl, getMovieUrl } from '@/configs/url.config'

export const metadata: Metadata = {
	icons: {
		icon: '/public/logo.svg',
	},
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export const revalidate = 60

const getSlides = async () => {
	const { data: movies } = await MovieService.getAll()
	const dataTrendingMovies = await MovieService.getMostPopular()
	const { data: dataActors } = await ActorsService.getAll()

	const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
		_id: m._id,
		link: getMovieUrl(m.slug),
		subTitle: getGenresList(m.genres),
		title: m.title,
		bigPoster: m.bigPoster,
	}))

	const trendingMovies: IGalleryItem[] = dataTrendingMovies
		.slice(0, 7)
		.map((t) => ({
			name: t.title,
			posterPath: t.poster,
			link: getMovieUrl(t.slug),
		}))

	const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
		posterPath: a.photo,
		name: a.name,
		link: getActorUrl(a.slug),
		content: {
			title: a.name,
			subTitle: `+${a.countMovies} movies`,
		},
	}))
	return { slides, trendingMovies, actors }
}

const PageHome: NextPage = async () => {
	const { slides, trendingMovies, actors } = await getSlides()

	return (
		<Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
	)
}
export default PageHome
