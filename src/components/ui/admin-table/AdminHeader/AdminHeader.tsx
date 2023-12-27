import { ChangeEvent, FC } from 'react'

import SearchField from '../../searchField/SearchField'

import styles from './AdminHeader.module.scss'
import AdminCreateButton from './AdminCreateButton'

interface IAdminHeader {
	onClick?: () => void
	searchterm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({
	onClick,
	searchterm,
	handleSearch,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchterm} handleSearch={handleSearch} />
            {onClick &&  <AdminCreateButton onClick={onClick}/>}
		</div>
	)
}

export default AdminHeader
