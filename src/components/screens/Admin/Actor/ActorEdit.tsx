'use client'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-element/Button'
import Field from '@/components/ui/form-element/Field'
import SlugField from '@/components/ui/form-element/SlugField/SlugField'
import UploadField from '@/components/ui/form-element/UploadField/UploadField'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import generateSlug from '@/utils/strings/generateSlug'

import formStyles from '../../../ui/form-element/admin-form-element.module.scss'

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

interface IActorEditProps {
	actorId: string
}

const ActorEdit: FC<IActorEditProps> = ({ actorId }) => {
	const {
		handleSubmit,
		register,
		formState,
		setValue,
		control,
		getValues,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue, actorId)

	return (
		<>
			<AdminNavigation />
			<Heading title="Edit actor" />

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
								error={formState.errors.name}
							/>

							<div>
								<SlugField
									register={register}
									error={formState.errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('name')))
									}}
								/>
							</div>
						</div>
						<Controller
							control={control}
							name="photo"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="actors"
									placeholder="Phot"
								/>
							)}
							rules={{
								required: 'Photo is required',
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default ActorEdit
