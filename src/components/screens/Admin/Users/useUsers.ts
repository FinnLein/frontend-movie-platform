'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebouncs'

import { UserService } from '@/services/users/Users.service'

import { convertMongoData } from '@/utils/date/ConvertMongoDBData'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { push } = useRouter()

	const queryData = useQuery(
		['user list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [
							user.email,
							user.isAdmin ? 'Admin' : 'User',
							convertMongoData(user.createdAt),
						],
					})
				),

			onError: (error) => {
				toastError(error, 'User list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: string) => UserService.deleteuser(userId),
		{
			onError: (error) => {
				toastError(error, 'Delete user')
			},
			onSuccess: () => {
				toastr.success('Delete user', 'delete was succesful')
				queryData.refetch()
			},
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		'create user',
		() => UserService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create user')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create user', 'delete was succesful')
				push(getAdminUrl(`user/edit/${_id}`))
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
