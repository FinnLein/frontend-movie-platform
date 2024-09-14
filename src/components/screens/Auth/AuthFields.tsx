import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-element/Field'
import { validEmail } from '@/shared/regex'

interface IAuth {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuth> = ({
	register,
	formState: { errors },
	isPasswordRequired = false
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required!',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email'
					}
				})}
				placeholder='E-mail'
			/>
			<span className='text-primary'>{errors.email && 'Email is invalid'}</span>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required!',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols!'
								}
							}
						: {}
				)}
				placeholder='Password'
				type='password'
			/>
			<span className='text-primary'>
				{errors.password && 'Password is invalid'}
			</span>
		</>
	)
}

export default AuthFields
