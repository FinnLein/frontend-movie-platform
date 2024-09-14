import { axiosClassic, instance } from 'api/interceptots'

import { IGenre } from '@/shared/types/movie.types'

import { getGenresUrl } from '@/configs/api.config'

import { ICollection } from '@/components/screens/Collections/collections.interface'
import { IGenreEditInput } from './../../components/screens/Admin/Genre/genre-edit.interface'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},
	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl('/collections'))
	},
	async getById(_id: string) {
		return instance.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},
	async deleteGenre(_id: string) {
		return instance.delete<string>(getGenresUrl(`/${_id}`))
	},
	async updateGenre(_id: string, data: IGenreEditInput) {
		return instance.put<string>(getGenresUrl(`/${_id}`), data)
	},
	async create() {
		return instance.post<string>(getGenresUrl(`/`))
	}
}
