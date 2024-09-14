import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import { ICollection } from './collections.interface'
import styles from './Collections.module.scss'
import CollectionsItem from './CollectionsItem'
const Collections: FC<{ collection: ICollection[] }> = ({ collection }) => {
	return (
		<div>
			<Heading title='Discovery' className={styles.heading} />
			<Description
				text='In this section you will find all genres on out site'
				className={styles.description}
			/>
			<section className={styles.collections}>
				{collection.length ? (
					collection.map(c => <CollectionsItem key={c._id} collection={c} />)
				) : (
					<div>There is no collections</div>
				)}
			</section>
		</div>
	)
}

export default Collections
