import { UserService } from '@/services/users/Users.service'
import { useQuery } from 'react-query'

export const useFavorites = () => {
	const {
		isLoading,
		data: favorites,
		refetch
	} = useQuery({
		queryKey: ['get favorites'],
		queryFn: () => UserService.getFavorites(),
		select: ({ data }) => data
	})

	return { isLoading, favorites, refetch }
}
