'use client'

import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-element/Button'
import Field from '@/components/ui/form-element/Field'
import SlugField from '@/components/ui/form-element/SlugField/SlugField'
import TextEditor from '@/components/ui/form-element/TextEditor'
import UploadField from '@/components/ui/form-element/UploadField/UploadField'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import generateSlug from '@/utils/strings/generateSlug'

import formStyles from '../../../ui/form-element/admin-form-element.module.scss'

import { IMovieEditInput } from './modie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenre'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
	ssr: false,
})

interface IMovieEdit {
	movieId: string
}

const MovieEdit: FC<IMovieEdit> = ({ movieId }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue, movieId)

	const { isLoading: isLoadingGenres, data: genres } = useAdminGenres()
	const { isLoading: isLoadingActors, data: actors } = useAdminActors()

	return (
		<>
			<AdminNavigation />
			<Heading title="Edit movie" />
			{isLoading ? (
				<SkeletonLoader count={3} />
			) : (
				<>
					<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required!',
								})}
								placeholder="Title"
								error={errors.title}
							/>
							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('title')))
								}
								register={register}
								error={errors.slug}
							/>
							<Field
								{...register('parameters.country', {
									required: 'Country is required!',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required!',
								})}
								placeholder="Duration (min.)"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.year', {
									required: 'Year is required!',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>

							<Controller
								name="genres"
								control={control}
								rules={{
									required: 'Please select at least one genre!',
								}}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										error={error}
										field={field}
										placeholder="Genres"
										options={genres || []}
										isLoading={isLoadingGenres}
										isMulty
									/>
								)}
							/>
							<Controller
								name="actors"
								control={control}
								rules={{
									required: 'Please select at least one actor!',
								}}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										error={error}
										field={field}
										placeholder="Actors"
										options={actors || []}
										isLoading={isLoadingActors}
										isMulty
									/>
								)}
							/>

							<Controller
								name="poster"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Poster"
										error={error}
										folder="movies"
										image={value}
										onChange={onChange}
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>

							<Controller
								name="bigPoster"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Big poster"
										error={error}
										folder="movies"
										image={value}
										onChange={onChange}
									/>
								)}
								rules={{
									required: 'Big poster is required!',
								}}
							/>

							<Controller
								name="videoUrl"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Video"
										error={error}
										folder="movies"
										image={value}
										onChange={onChange}
										style={{ marginTop: -25 }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video is required!',
								}}
							/>
						</div>
						<Controller
							control={control}
							name="desсription"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<TextEditor
									onChange={onChange}
									error={error}
									value={value}
									placeholder="Description"
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'Description is required',
								},
							}}
						/>
						<Button>Update</Button>
					</form>
				</>
			)}
		</>
	)
}

export default MovieEdit
