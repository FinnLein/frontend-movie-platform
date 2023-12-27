import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'

import Statistics from './Home/Statistics/Statistics'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import { IMovie } from '@/shared/types/movie.types'


const Admin: FC = () => {
	return (
		<>
            <AdminNavigation/>
			<Heading title="Some Statistics" />
			<Statistics/>
		</>
	)
}

export default Admin
