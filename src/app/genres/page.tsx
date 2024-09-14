import Collections from '@/components/screens/Collections/Collections'
import { ICollection } from '@/components/screens/Collections/collections.interface'
import { GenreService } from '@/services/genre/Genre.service'
import { NextPage } from 'next'

const getCollections = async () => {
	const genres = await GenreService.getCollections()

	return genres
}

const GenresPage: NextPage<{ colletions: ICollection[] }> = async ({
	colletions
}) => {
	const { data } = await getCollections()

	return <Collections collection={data || []} />
}
export default GenresPage
