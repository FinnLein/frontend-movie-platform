import { IMenu } from './Menu.types'

export const firstMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'MdHome',
			link: '/',
			title: 'Home',
		},
		{
			icon: 'MdExplore',
			link: '/genres',
			title: 'Dicovery',
		},
		{
			icon: 'MdRefresh',
			link: '/fresh',
			title: 'Fresh movies',
		},
		{
			icon: 'MdLocalFireDepartment',
			link: '/trends',
			title: 'Trends now',
		},
	],
}

export const userMenu: IMenu = {
	title: 'General',
	items: []
}

export const menus: IMenu[] = [firstMenu, userMenu]