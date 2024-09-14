import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IVideoElement } from './video.interface'

export const useVideo = () => {
	const videoRef = useRef<IVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [totalTime, setTotalTime] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if (originalDuration) setTotalTime(originalDuration)
	}, [videoRef.current?.duration])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / totalTime) * 100)
		}

		video.addEventListener('timeupdate', updateProgress)
		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [totalTime])

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
					forward()
					break
				case 'ArrowLeft':
					backward()
					break
				case ' ': {
					e.preventDefault()
					toggleVideo()
					break
				}
				case 'f':
					toggleVideo()
					break

				default:
					return
			}
		}

		const handleClick = () => {
			toggleVideo()
		}
		
		if (videoRef.current) {
			videoRef.current.addEventListener('click', handleClick)
		}

		document.addEventListener('keydown', handleKey)
		return () => {
			document.removeEventListener('keydown', handleKey)
		}
	}, [toggleVideo])

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 10
	}
	const backward = () => {
		if (videoRef.current) videoRef.current.currentTime -= 10
	}

	const fullscreen = () => {
		const video = videoRef.current

		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.mozRequestFullscreen) {
			video.mozRequestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		}
	}

	return useMemo(
		() => ({
			videoRef,
			actions: {
				fullscreen,
				forward,
				backward,
				toggleVideo
			},
			video: {
				isPlaying,
				currentTime,
				progress,
				totalTime
			}
		}),
		[isPlaying, currentTime, progress, totalTime, toggleVideo]
	)
}
