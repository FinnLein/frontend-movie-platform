import { TypeMaterialIconName } from './Icons.types'

export interface IParameters {
	year: number
	duration: number
	country: string
}

export interface IActor {
	_id: string
	photo: string
	name: string
	countMovies: number
	slug: string
}

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeMaterialIconName
}

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	parameters: IParameters
	genres: IGenre[]
	actors: IActor[]
	countOpened: number
	description: string
	videoUrl: string
	rating: number
	slug: string
	isSendTelegram?: boolean
}

export interface TypedMovie {
	movies: IMovie[]
}