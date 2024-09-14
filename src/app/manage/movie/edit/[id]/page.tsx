import MovieEdit from '@/components/screens/Admin/Movie/MovieEdit'
import { NextPage } from 'next'

interface IMovieEdit {
	params: { id: string }
}

const MoviePageEdit: NextPage<IMovieEdit> = ({ params }) => {
	return <MovieEdit movieId={params.id} />
}

export default MoviePageEdit
