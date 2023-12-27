'use client'

import { FC } from 'react'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import { useGenre } from './useGenre'

const GenresList: FC = () => {
	const {
		isLoading,
		handleSearch,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useGenre()

	return (
		<>
			<AdminNavigation />
			<Heading title="Genres" />

			<AdminHeader
				handleSearch={handleSearch}
				searchterm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				tableItems={data || []}
				headerItems={['Genre name', 'Genre description']}
			/>
		</>
	)
}

export default GenresList
