import { getRatingsUrl } from '@/configs/api.config'
import instance from 'api/interceptots'

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return instance.post<string>(getRatingsUrl('/set-rating'), {
			movieId,
			value,
		})
	},

	async getByUserMovie(movieId: string) {
		return instance.get<number>(getRatingsUrl(`/${movieId}`))
	},
}
