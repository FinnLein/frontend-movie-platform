import { axiosClassic } from 'api/interceptots'
import axios from 'api/interceptots'

import { IGenre } from '@/shared/types/movie.types'

import { getGenresUrl } from '@/configs/api.config'

import { IGenreEditInput } from './../../components/screens/Admin/Genre/genre-edit.interface'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
	async getById(_id: string) {
		return axiosClassic.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},
	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`))
	},
	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data)
	},
	async create() {
		return axios.post<string>(getGenresUrl(`/`))
	},
}
