import { FC } from 'react'

import Logo from './Logo'
import MenuContainer from './MenuContainer/MenuContainer'
import Styles from './Navigation.module.scss'

const Navigation: FC = () => {
	return (
		<div className={Styles.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	)
}

export default Navigation
