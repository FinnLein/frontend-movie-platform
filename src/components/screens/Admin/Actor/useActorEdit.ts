import { error } from 'console'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ActorsService } from '@/services/actors/Actors.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IActorEditInput } from './actor-edit.interface'

export const useActorEdit = (
	setValue: UseFormSetValue<IActorEditInput>,
	actorId: string
) => {
	const searchParams = useSearchParams()

	const { push } = useRouter()

	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorsService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
				setValue('name', data.name)
			},
			onError: (error) => {
				toastError(error, 'Get actor')
			},
			enabled: !!searchParams.get('id'),
		}
	)

	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorsService.update(actorId, data),
		{
			onError: (error) => {
				toastError(error, 'Update actor')
			},
			onSuccess: () => {
				toastr.success('Update genre', 'updating succesful')
				push(getAdminUrl('actor'))
			},
		}
	)

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { isLoading, onSubmit }
}
