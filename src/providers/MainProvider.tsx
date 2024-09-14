'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { accentColor } from '@/configs/constant.ts'

import { store } from '@/store/store'

import AuthProvider from './AuthProvider/AuthProvider'
import ReduxToast from './ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<ProgressBar
					color={accentColor}
					options={{ showSpinner: false }}
					shallowRouting
					height='4px'
				/>
				<ReduxToast />
				<AuthProvider>{children}</AuthProvider>
			</Provider>
		</QueryClientProvider>
	)
}

export default MainProvider
