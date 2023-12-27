'use client'

import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import SlideItem from './SlideItem'
import styles from './Slider.module.scss'
import SlideArrow from './SliderArrow/SlideArrow'
import { ISlide } from './slidet.interface'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { handleClick, isNext, isPrev, index, slideIn } = useSlider(
		slides.length
	)

	return (
		<div className={styles.slider}>
			<CSSTransition
				in={slideIn}
				classNames="slide-animation"
				timeout={300}
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>
			{isPrev && (
				<SlideArrow direction="left" handleClick={() => handleClick('prev')} />
			)}
			{isNext && (
				<SlideArrow direction="right" handleClick={() => handleClick('next')} />
			)}
		</div>
	)
}

export default Slider
