import { NextPage } from 'next'

import GenreEdit from '@/components/screens/Admin/Genre/GenreEdit'

interface IGenreProps {
	params: { id: string }
}

const GenreEditPage: NextPage<IGenreProps> = ({ params }) => {
	return <GenreEdit genreId={params.id} />
}

export default GenreEditPage
