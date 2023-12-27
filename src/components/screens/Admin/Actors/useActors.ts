import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebouncs'

import { ActorsService } from '@/services/actors/Actors.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['Actors list', debouncedSearch],
		() => ActorsService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, 'actors list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'Delete actor',
		(actorId: string) => ActorsService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, 'actors list')
			},
			onSuccess: () => {
				toastr.success('Delete actor', 'deleting success')
				queryData.refetch()
			},
		}
	)

	const { mutateAsync: createAsync } = useMutation(
		'Create actor',
		() => ActorsService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create actor')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create actor', ' creating success')
				push(getAdminUrl(`actor/edit/${_id}`))
			},
		}
	)

	return useMemo(
		() => ({
			...queryData,
			searchTerm,
			handleSearch,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
