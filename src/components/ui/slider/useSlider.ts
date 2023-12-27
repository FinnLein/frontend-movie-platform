'use client'

import { useState } from 'react'

export const useSlider = (length: number) => {
	const [currentIdx, setCurrentIdx] = useState(0)
	const [slideIn, setSlideIn] = useState(true)

	const isExistsNext = currentIdx + 1 < length
	const isExistsPrev = currentIdx ? currentIdx - 1 < length : false

	const handleArrowClick = (direction: 'prev' | 'next') => {
		const newIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1
		setSlideIn(false)

		setTimeout(() => {
			setCurrentIdx(newIdx)
			setSlideIn(true)
		}, 300)
	}

	return {
		slideIn,
		index: currentIdx,
		isNext: isExistsNext,
		isPrev: isExistsPrev,
		handleClick: handleArrowClick,  
	}
}
