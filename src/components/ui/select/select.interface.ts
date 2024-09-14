import { Options } from 'react-select'

import { IFieldProps } from '../form-element/form.interface'
import { ControllerRenderProps } from 'react-hook-form'

export interface IOption {	
	value: string
	label: string
}

export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulty?: boolean
    field: ControllerRenderProps<any, any>
    isLoading?: boolean
}
