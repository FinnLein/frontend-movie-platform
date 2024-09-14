import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/users/Users.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IUserEditInput } from './user-edit.inteface'

export const useUserEdit = (
	setValue: UseFormSetValue<IUserEditInput>,
	userId: string
) => {
	const searchParams = useSearchParams()

	const { push } = useRouter()

	const { isLoading } = useQuery(
		['user', userId],
		() => UserService.getById(userId),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email)
				setValue('isAdmin', data.isAdmin)
			},
			onError: (error) => {
				toastError(error, 'Get user')
			},

			enabled: !!searchParams.get('id'),
		}
	)

	const { mutateAsync } = useMutation(
		'Edit user',
		(data: IUserEditInput) => UserService.update(userId, data),
		{
			onError: (error) => {
				toastError(error, 'Edit user')
			},
			onSuccess: () => {
				toastr.success('Edit user', 'editing is success')
				push(getAdminUrl('user'))
			},
		}
	)

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
