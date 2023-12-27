'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebouncs'

import { MovieService } from '@/services/movie/Movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearchTerm = useDebounce(searchTerm, 500)
	const { push } = useRouter()

	const queryData = useQuery(
		['movie list', debouncedSearchTerm],
		() => MovieService.getAll(debouncedSearchTerm),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastError(error, 'Movie list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, 'Delete movie')
			},
			onSuccess: () => {
				toastr.success('Delete movie', 'deleting success')
				queryData.refetch()
			},
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		'create movie',
		() => MovieService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create movie')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create movie', 'creating success')
				push(getAdminUrl(`movie/edit/${_id}`))
			},
		}
	)

	return useMemo(
		() => ({
			...queryData,
			handleSearch,
			deleteAsync,
			searchTerm,
			createAsync,
		}),
		[queryData, deleteAsync, searchTerm, createAsync]
	)
}
