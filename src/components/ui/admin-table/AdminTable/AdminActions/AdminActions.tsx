import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { MaterialIcon } from '@/components/ui/icons/MaterialIcon'

import styles from './AdminActions.module.scss'

interface IAdminAcions {
	editUrl: string
	removeHandler: () => void
}

const AdminActions: FC<IAdminAcions> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()

	return (
		<div className={styles.action}>
			<button onClick={() => push(editUrl)}>
				<MaterialIcon name="MdEdit" />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name="MdClose" />
			</button>
		</div>
	)
}

export default AdminActions
