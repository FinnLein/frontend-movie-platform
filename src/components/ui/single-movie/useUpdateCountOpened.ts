import { MovieService } from '@/services/movie/Movie.service'
import { toastError } from '@/utils/toast-error'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useUpdateCountOpened = (slug: string) => {
	const { mutateAsync } = useMutation({
		mutationKey: ['update count opened'],
		mutationFn: () => MovieService.updateCountOpened(slug),
		
	})

	useEffect(() => {
		mutateAsync()
	}, [])
}
