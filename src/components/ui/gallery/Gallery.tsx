import { FC } from 'react'

import styles from './Gallery.module.scss'
import GalleryItem from './GalleryItem'
import { IGalleryItem } from './gallery.interface'

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<div className={styles.gallery}>
			{items.map((item) => (
				<GalleryItem 
					key={item.link}
					item={item}
					variant="vertical"
				></GalleryItem>
			))}
		</div>
	)
}

export default Gallery
