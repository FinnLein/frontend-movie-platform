import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { ActorsService } from '@/services/actors/Actors.service'

import { toastError } from '@/utils/toast-error'

export const useAdminActors = () => {
	const queryData = useQuery('list of actor', () => ActorsService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError(error) {
			toastError(error, 'actor list')
		},
	})

	return queryData
}
