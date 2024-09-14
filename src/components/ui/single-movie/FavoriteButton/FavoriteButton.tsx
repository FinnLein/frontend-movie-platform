'use client'

import { useFavorites } from '@/components/screens/favorites/useFavorites'
import { UserService } from '@/services/users/Users.service'
import { toastError } from '@/utils/toast-error'
import cn from 'clsx'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import styles from './FavoriteButton.module.scss'
import image from '../../../../../public/heart-animation.png'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favorites, refetch } = useFavorites()

	useEffect(() => {
		if (!favorites) return
		const isHasMovie = favorites.some(f => f._id === movieId)
		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
	}, [favorites, isSmashed, movieId])

	const { mutateAsync } = useMutation({
		mutationKey: ['update favorites'],
		mutationFn: () => UserService.toggleFavorite(movieId),
		onError: error => {
			toastError(error, 'Unsuccesful update favorites')
		},
		onSuccess() {
			setIsSmashed(!isSmashed)
			refetch()
		}
	})

	return (
		<button
			title='favorite'
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed
			})}
			style={{ backgroundImage: `url(${image.src})` }}
		/>
	)
}

export default FavoriteButton
