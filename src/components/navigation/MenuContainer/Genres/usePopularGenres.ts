import { useQuery } from 'react-query'

import { GenreService } from '@/services/genre/Genre.service'

import { getGenreUrl } from '@/configs/url.config'

import { IMenuItem } from '../Menu.types'

export const usePopularGenres = () => {
	const queryData = useQuery(
		'popular genres menu',
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data
					.filter((genre) => genre.icon)
					.map(
						(genre): IMenuItem => ({
							icon: genre.icon,
							link: getGenreUrl(genre.slug),
							title: genre.name,
						})
					)
					.splice(0, 4),
		}
	)

	return queryData
}
