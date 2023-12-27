'use client'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-element/Button'
import Field from '@/components/ui/form-element/Field'
import SlugField from '@/components/ui/form-element/SlugField/SlugField'
import TextEditor from '@/components/ui/form-element/TextEditor'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import generateSlug from '@/utils/strings/generateSlug'

import formStyles from '../../../ui/form-element/admin-form-element.module.scss'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

interface IGenreEditProps {
	genreId: string
}

const GenreEdit: FC<IGenreEditProps> = ({ genreId }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		control,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue, genreId)

	return (
		<>
			<AdminNavigation />
			<Heading title="Edit genre" />

			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('name')))
									}}
								/>
							</div>

							<Field
								{...register('icon', {
									required: 'Icon is required!',
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>

						<Controller
							control={control}
							name="description"
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
					</>
				)}
			</form>
		</>
	)
}

export default GenreEdit
