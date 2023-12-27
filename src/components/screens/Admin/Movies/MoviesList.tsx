'use client'

import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import { useMovies } from './useMovies'

const MoviesList: FC = () => {
	const {
		data,
		searchTerm,
		handleSearch,
		isLoading,
		deleteAsync,
		createAsync,
	} = useMovies()

	return (
		<>
			<AdminNavigation />
			<Heading title="Movies" />

			<AdminHeader
				handleSearch={handleSearch}
				searchterm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				tableItems={data || []}
				headerItems={['Movie title', 'Genre list', 'Movie rating']}
			/>
		</>
	)
}

export default MoviesList
