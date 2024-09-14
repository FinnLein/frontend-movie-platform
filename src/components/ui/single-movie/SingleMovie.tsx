'use client'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import dynamic from 'next/dynamic'
import Banner from '../banner/Banner'
import Gallery from '../gallery/Gallery'
import { IGalleryItem } from '../gallery/gallery.interface'
import SubHeading from '../heading/SubHeading'
import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'

interface SingleMovieProps {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const DynamicPlayer = dynamic(() => import('@/ui/video-player/VideoPlayer'), {
	ssr: false
})

const DynamicRateMovie = dynamic(
	() => import('@/ui/single-movie/RateMovie/RateMovie'),
	{
		ssr: false
	}
)

const SingleMovie: FC<SingleMovieProps> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug)
	return (
		<>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			<DynamicPlayer slug={movie.slug} source={movie.videoUrl} />
			<div className='mt-12'>
				<SubHeading title='Similar' />
				<Gallery items={similarMovies} />
			</div>
			<DynamicRateMovie movieId={movie._id} slug={movie.slug} />	
		</>
	)
}

export default SingleMovie
