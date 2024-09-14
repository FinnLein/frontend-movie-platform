import { axiosClassic, instance } from 'api/interceptots'

import { IUser } from '@/shared/types/user.types'

import { getUsersUrl } from '@/configs/api.config'

import { IMovie } from '@/shared/types/movie.types'
import { IProfileInput } from './../../components/screens/Profile/profile.interface'

export const UserService = {
	async getAll(searchTerm?: string) {
		return instance.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {}
		})
	},
	async getProfile() {
		return instance.get<IUser>(getUsersUrl('/profile'))
	},
	async getFavorites() {
		return instance.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},

	async toggleFavorite(movieId: string) {
		return instance.put(getUsersUrl('/profile/favorites'), {
			movieId,
		})
	},
	async updateProfile(data: IProfileInput) {
		return instance.put<string>(getUsersUrl('/profile'), data)
	},

	async getById(_id: string) {
		return axiosClassic.get<IUser>(getUsersUrl(`/${_id}`))
	},
	async deleteuser(_id: string) {
		return instance.delete<string>(getUsersUrl(`/${_id}`))
	},
	async update(_id: string, data: IProfileInput) {
		return instance.put<string>(getUsersUrl(`/${_id}`), data)
	},
	async create() {
		return instance.post<string>(getUsersUrl(`/`))
	}
}
