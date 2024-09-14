import { RatingService } from '@/services/rating/Rating.service'
import { toastError } from '@/utils/toast-error'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { refetch } = useQuery({
		queryKey: ['your movie rating', movieId],
		queryFn: () => RatingService.getByUserMovie(movieId),
		onSuccess({ data }) {
			setRating(data)
		},
		enabled: !!movieId
	})

	const { mutateAsync: rateMovie } = useMutation({
		mutationKey: ['set rating movie'],
		mutationFn: ({ value }: { value: number }) =>
			RatingService.setRating(movieId, value),
		onError(error) {
			toastError(error, 'Rate movie')
		},
		onSuccess() {
			toastr.success('Rate movie', 'You have successfully rated!')

			setIsSended(true)
			refetch()

			setTimeout(() => {
				setIsSended(false)
			}, 2400)
		}
	})


	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await rateMovie({ value: nextValue })
	}

	return {
		isSended,
		rating,
		handleClick
	}
}
