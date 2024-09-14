'use client'

import { useAuth } from '@/hooks/useAuth'
import cn from 'clsx'
import { FC } from 'react'
import { MaterialIcon } from '../icons/MaterialIcon'
import AuthPlaceholder from './auth-placeholder/AuthPlaceholder'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.interface'
import styles from './VideoPlayer.module.scss'
const VideoPlayer: FC<IVideoPlayer> = ({ slug, source }) => {
	const { videoRef, video, actions } = useVideo()
	const { user } = useAuth()

	return (
		<div
			className={cn(styles.wrapper, {
				'h-96': !user
			})}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={source}
						preload='metadata'
					/>
					<div className={styles.progressBarContainer}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						></div>
					</div>

					<div className={styles.controls}>
						<div>
							<button title='backward' onClick={actions.backward}>
								<MaterialIcon name='MdHistory' />
							</button>
							<button title='backward' onClick={actions.forward}>
								<MaterialIcon name='MdUpdate' />
							</button>
							<button title='backward' onClick={actions.toggleVideo}>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>

							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.totalTime / 60) +
										':' +
										('0' + Math.floor(video.totalTime % 60)).slice(-2)}
								</p>{' '}
							</div>
						</div>
						<div>
							<button title='fullscreen' onClick={actions.fullscreen}>
								<MaterialIcon name='MdFullscreen' />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}

export default VideoPlayer
