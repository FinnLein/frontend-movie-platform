'use client'

import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form-element/Button'
import Heading from '@/components/ui/heading/Heading'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: RegisterInput,
		handleSubmit,
		reset,
		formState,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	const { login, register } = useActions()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') login(data)
		else register(data)

		reset()
	}

	return (
		<section className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading title="Auth" className="text-gray-500 mb-8 text-xl" />
				<AuthFields
					formState={formState}
					register={RegisterInput}
					isPasswordRequired
				/>
				<div className={styles.buttons}>
					<Button
						type="submit"
						onClick={() => setType('login')}
						disabled={isLoading}
					>
						Login
					</Button>
					<Button
						type="submit"
						onClick={() => setType('register')}
						disabled={isLoading}
					>
						Register
					</Button>
				</div>
			</form>
		</section>
	)
}

export default Auth
