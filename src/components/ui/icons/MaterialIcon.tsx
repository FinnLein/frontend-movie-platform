'use client'

import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { useRenderClient } from '@/hooks/useRenderClient'

import { TypeMaterialIconName } from '@/shared/types/Icons.types'

export const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	const IconComponent = MaterialIcons[name]

	const { isRenderClient } = useRenderClient()

	if (isRenderClient)
		return <IconComponent /> || <MaterialIcons.MdDragIndicator />
	else return null
}
