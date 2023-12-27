import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '../../assets/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link href="/" className="px-layout mb-10 block">
			<Image priority alt='123' width={250} height={40} src={logoImage} draggable={false} />
		</Link>
	)
}

export default Logo
