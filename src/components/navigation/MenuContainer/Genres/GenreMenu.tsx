"use client"
import { FC } from 'react'

import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'

import Menu from '../Menu'

import { usePopularGenres } from './usePopularGenres.ts'

const GenreMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className="mx-11 mb-6">
			<SkeletonLoader count={5} className="h-7 mt-6"/>
		</div>
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	)
}

export default GenreMenu
