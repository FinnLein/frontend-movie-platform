import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import StarRating from 'react-star-rating-component'
import AuthButton from '../../video-player/auth-placeholder/AuthButton'
import { IRateMovie } from './rate-movie.inteface'
import styles from './RateMovie.module.scss'
import { useRateMovie } from './useRateMovie'

const RateMovie: FC<IRateMovie> = ({ movieId, slug }) => {
	const { user } = useAuth()

	const { isSended, handleClick, rating } = useRateMovie(movieId)

	return (
		<div className={styles.wrapper}>
			<h3>How do u like the movie</h3>
			<p>Ratings improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for rating</div>
					) : (
						<StarRating
							name='star-rating'
							value={rating}
							onStarClick={handleClick}
							emptyStarColor='#4f4f4f'
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
