'use client'

import { FC } from 'react'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import { useActors } from './useActors'

const ActorsList: FC = () => {
	const {
		isLoading,
		handleSearch,
		searchTerm,
		deleteAsync,
		data,
		createAsync,
	} = useActors()

	return (
		<>
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				searchterm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>

			<AdminTable
				tableItems={data || []}
				removeHandler={deleteAsync}
				isLoading={isLoading}
				headerItems={['Actor name', 'Count movies']}
			/>
		</>
	)
}

export default ActorsList
