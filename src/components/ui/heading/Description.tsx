import cn from 'clsx'
import parse from 'html-react-parser'
import { FC } from 'react'

const Description: FC<{ text: string; className?: string }> = ({
	text,
	className = '',
}) => {
	return (
		<div className={cn(`text-white text-opacity-80 font-semibold`, className)}>
			{parse(text)}
		</div>
	)
}

export default Description
