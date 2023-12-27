'use client'

import { FC } from 'react'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import { useUsers } from './useUsers'

const UsersList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useUsers()

	return (
		<>
			<AdminNavigation />
			<Heading title="Users" />

			<AdminHeader
				handleSearch={handleSearch}
				searchterm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Role', 'Date register']}
				tableItems={data || []}
			/>
		</>
	)
}

export default UsersList
