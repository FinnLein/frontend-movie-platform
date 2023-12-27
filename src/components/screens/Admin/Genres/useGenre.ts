'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebouncs'

import { GenreService } from '@/services/genre/Genre.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useGenre = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['Genre list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastError(error, 'Genre list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'Delete genre',
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
			onError: (error) => {
				toastError(error, 'Delete genre')
			},
			onSuccess: () => {
				toastr.success('Delete genre', ' deleting success')
				queryData.refetch()
			},
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		'Create genre',
		() => GenreService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create genre')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create genre', ' creating success')
				push(getAdminUrl(`genre/edit/${_id}`))
			},
		}
	)

	return useMemo(
		() => ({
			...queryData,
			deleteAsync,
			handleSearch,
			searchTerm,
			createAsync
		}),
		[queryData, deleteAsync, searchTerm, createAsync]
	)
}
