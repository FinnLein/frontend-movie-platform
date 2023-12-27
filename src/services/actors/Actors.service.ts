import axios, { axiosClassic } from 'api/interceptots'

import { IActor } from '@/shared/types/movie.types'

import { getActorsUrl } from '@/configs/api.config'

import { IActorEditInput } from '../../components/screens/Admin/Actor/actor-edit.interface'

export const ActorsService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},

	async update(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},

	async create() {
		return axios.post<string>(getActorsUrl(`/`))
	},
}
