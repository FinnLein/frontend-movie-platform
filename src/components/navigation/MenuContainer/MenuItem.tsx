'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { MaterialIcon } from '@/ui/icons/MaterialIcon'

import styles from './Menu.module.scss'
import { IMenuItem } from './Menu.types'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const pathName = usePathname()

	return (
		<li
			className={cn({
				[styles.active]: pathName === item.link,
			})}
		>
			<Link href={item.link}>
				<MaterialIcon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>
	)
}

export default MenuItem
