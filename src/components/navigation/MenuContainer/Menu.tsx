import dynamic from 'next/dynamic'
import { FC } from 'react'

import AuthItems from './Auth/AuthItems'
import Styles from './Menu.module.scss'
import { IMenu } from './Menu.types'
import MenuItem from './MenuItem'

const DynamicAuthItems = dynamic(() => import('./Auth/AuthItems'), {
	ssr: false,
})

const Menu: FC<{ menu: IMenu }> = ({ menu: { title, items } }) => {
	return (
		<div className={Styles.menu}>
			<div className={Styles.heading}>{title}</div>
			<ul className={Styles.ul}>
				{items.map((item) => (
					<MenuItem item={item} key={item.link} />
				))}
				{title === 'General' ? <DynamicAuthItems /> : null}
			</ul>
		</div>
	)
}

export default Menu
