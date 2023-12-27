'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-element/Button'
import Field from '@/components/ui/form-element/Field'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import formStyles from '../../../ui/form-element/admin-form-element.module.scss'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.inteface'

interface IUsersEditProps {
	userId: string
}

const UserEdit: FC<IUsersEditProps> = ({ userId }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<IUserEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useUserEdit(setValue, userId)

	return (
		<>
			<AdminNavigation />
			<Heading title="Edit users" />

			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('email', {
									required: 'Email is required',
								})}
								placeholder="Email"
								error={errors.email}
								style={{ width: '31%' }}
							/>
						</div>

						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default UserEdit
