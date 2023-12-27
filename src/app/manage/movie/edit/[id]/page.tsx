import { NextPage } from 'next'

import MovieEdit from '@/components/screens/Admin/Movie/MovieEdit'

interface IMovieEdit {
	params: { id: string }
}

const MoviePageEdit: NextPage<IMovieEdit> = ({ params }) => {
	return <MovieEdit movieId={params.id} />
}

export default MoviePageEdit
