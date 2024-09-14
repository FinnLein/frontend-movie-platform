import Image from 'next/image'
import { FC } from 'react'

import styles from './Banner.module.scss'

interface IBanner {
	image: string
	Detail?: FC | null
}

const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<Image
				fill
				src={image}
				alt=""
				draggable={false}
				priority
				unoptimized
				className="image-like-bg object-top"
			/>
			{Detail && <Detail />}
		</div>
	)
}

export default Banner
