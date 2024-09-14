import { useFavorites } from '@/components/screens/favorites/useFavorites'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import { useAuth } from '@/hooks/useAuth'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import MovieList from '../MovieList'

const FavoriteMovies: FC = () => {
	const { isLoading, favorites } = useFavorites()
	const { user } = useAuth()

	const DynamicNotAuthFavorites = dynamic(() => import('./NotAuthFavorites'), {
		ssr: false
	})

	if (!user) return <DynamicNotAuthFavorites />

	if (!favorites?.length) return <div></div>

	return isLoading ? (
		<div className='mt-11'>
			<SkeletonLoader count={3} className='h-28 mb-4' />
		</div>
	) : (
		<MovieList
			link='/favorites'
			movies={favorites?.slice(0, 3) || []}
			title='Favorites movies'
		/>
	)
}

export default FavoriteMovies
