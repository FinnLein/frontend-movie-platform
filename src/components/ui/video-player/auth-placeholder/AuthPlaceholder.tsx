import { FC } from 'react'
import AuthButton from './AuthButton'
import styles from './AuthPlaceholder.module.scss'

const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className={styles.placeholder}>
			<div>
				<div>you must be logged in to watch</div>
			</div>
			<AuthButton slug={slug} />
		</div>
	)
}

export default AuthPlaceholder
