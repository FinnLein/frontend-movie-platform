import { FC } from 'react'
import ReactSelect, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'

import formStyles from '../form-element/Form.module.scss'

import styles from './Select.module.scss'
import { IOption, ISelect } from './select.interface'

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulty,
	options,
	field,
	isLoading,
}) => {
	const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulty
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulty
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value)
		} else {
			return isMulty ? [] : ('' as any)
		}
	}

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select"
					placeholder={''}
					options={options}
					value={getValue()}
					onChange={onChange}
					isMulti={isMulty}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			{error && <div className={formStyles.error}>{error.message}</div>}
		</div>
	)
}

export default Select
