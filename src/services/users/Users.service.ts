import axios, { axiosClassic } from 'api/interceptots'

import { IUserEditInput } from '@/components/screens/Admin/User/user-edit.inteface'

import { IUser } from '@/shared/types/user.types'

import { getUsersUrl } from '@/configs/api.config'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getById(_id: string) {
		return axiosClassic.delete<IUserEditInput>(getUsersUrl(`/${_id}`))
	},
	async deleteuser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	},
	async update(_id: string, data: IUserEditInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},
	async create() {
		return axios.post<string>(getUsersUrl(`/`))
	},
}
