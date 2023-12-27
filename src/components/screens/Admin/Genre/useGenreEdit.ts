'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { GenreService } from '@/services/genre/Genre.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/configs/url.config'

import { IGenreEditInput } from './genre-edit.interface'

export const useGenreEdit = (
	setValue: UseFormSetValue<IGenreEditInput>,
	genreId: string
) => {
	const { push } = useRouter()

	const searchParams = useSearchParams()

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})

				setValue('name', data.name)
			},
			onError: (error) => {
				toastError(error, 'Get genre')
			},
			enabled: !!searchParams.get('id'),
		}
	)
	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.updateGenre(genreId, data),
		{
			onError: (error) => {
				toastError(error, 'Update genre')
			},
			onSuccess() {
				toastr.success('Update genre', 'updating succesful')
				push(getAdminUrl('genre'))
			},
		}
	)

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
