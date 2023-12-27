import { FC } from 'react'

import Gallery from '@/components/ui/gallery/Gallery'
import Heading from '@/components/ui/heading/Heading'
import SubHeading from '@/components/ui/heading/SubHeading'
import Slider from '@/components/ui/slider/Slider'

import { IHome } from './home.interface'

const Home: FC<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<>
			<Heading
				title="Watch movies online"
				className="text-gray-500 mb-8 text-xl"
			/>
			{slides.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title="Trending now" />
				{trendingMovies && <Gallery items={trendingMovies} />}
			</div>

			<div>
				<SubHeading title="Best actors" />
				{actors && <Gallery items={actors} />}
			</div>
		</>
	)
}

export default Home
