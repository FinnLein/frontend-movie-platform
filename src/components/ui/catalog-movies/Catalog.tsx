import { FC } from 'react'

import { getMovieUrl } from '@/configs/url.config'

import GalleryItem from '../gallery/GalleryItem'
import Description from '../heading/Description'
import Heading from '../heading/Heading'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							name: movie.title,
							posterPath: movie.bigPoster,
							link: getMovieUrl(movie.slug),
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</>
	)
}

export default Catalog
