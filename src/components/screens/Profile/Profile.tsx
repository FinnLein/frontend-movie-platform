'use client'

import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Profile.module.scss'

import Button from '@/components/ui/form-element/Button'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import Link from 'next/link'
import AuthFields from '../Auth/AuthFields'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { register, handleSubmit, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange'
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<>
			<Heading title='Profile' className='mb-6' />
			<div>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<AuthFields register={register} formState={formState} />
						<Button>Update</Button>
					</form>
				)}
			</div>
			<Link className='text-lg mt-10' href={'/favorites'}>
				Favorites
			</Link>
		</>
	)
}

export default Profile
