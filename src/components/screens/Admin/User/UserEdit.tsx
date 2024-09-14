'use client'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-element/Button'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import formStyles from '../../../ui/form-element/admin-form-element.module.scss'
import AuthFields from '../../Auth/AuthFields'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.inteface'

interface IUsersEditProps {
	userId: string
}

const UserEdit: FC<IUsersEditProps> = ({ userId }) => {
	const { handleSubmit, register, formState, setValue, control } =
		useForm<IUserEditInput>({
			mode: 'onChange'
		})

	const { isLoading, onSubmit } = useUserEdit(setValue, userId)

	return (
		<>
			<AdminNavigation />
			<Heading className='mb-10' title='Edit users' />

			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.adminForm}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields register={register} formState={formState} />

						<Controller
							control={control}
							name='isAdmin'
							render={({ field }) => (
								<button
									onClick={e => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
									className='text-link block mb-7'
								>
									{field.value ? 'Make it regular user' : 'Make it admin'}
								</button>
							)}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</>
	)
}

export default UserEdit
