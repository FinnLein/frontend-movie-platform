import { axiosClassic, instance } from 'api/interceptots'

import { IMovieEditInput } from '@/components/screens/Admin/Movie/modie-edit.interface'

import { IMovie } from '@/shared/types/movie.types'

import { getMoviesUrl } from '@/configs/api.config'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},
	async getById(_id: string) {
		return instance.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},
	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), { genreIds })
	},

	async getByActors(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	async getMostPopular() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return movies
	},
	async deleteMovie(_id: string) {
		return instance.delete<string>(getMoviesUrl(`/${_id}`))
	},
	async update(_id: string, data: IMovieEditInput) {
		return instance.put<string>(getMoviesUrl(`/${_id}`), data)
	},
	async create() {
		return instance.post<string>(getMoviesUrl('/'))
	},
	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl('/update-count-opened'), {
			slug
		})
	}
}
