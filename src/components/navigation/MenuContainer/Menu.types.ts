import { TypeMaterialIconName } from '@/shared/types/Icons.types.ts'

export interface IMenuItem {
	icon: TypeMaterialIconName
	title: string
	link: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
