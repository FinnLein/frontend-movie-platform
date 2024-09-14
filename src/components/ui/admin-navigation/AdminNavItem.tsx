'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import styles from './AdminNavigation.module.scss'
import { INavItem } from './admin-navigation.interface'
import Link from 'next/link'

const AdminNavItem: FC<{ item: INavItem }> = ({ item: { title, link } }) => {
	const pathName = usePathname()

	return (
		<li
			className={cn({
				[styles.active]: pathName === link
			})}
		>
			<Link href={link}>{title}</Link>
		</li>
	)
}

export default AdminNavItem
