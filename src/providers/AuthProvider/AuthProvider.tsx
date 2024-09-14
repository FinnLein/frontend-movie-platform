import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import NotFound from '@/app/not-found'
import Auth from '@/components/screens/Auth/Auth'
import { protectedRoutes } from './protected-routes'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()
	const pathname = usePathname()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	const isProtectedRoute = protectedRoutes.some(
		route => pathname?.startsWith(route)
	)

	const isAdminRoute = pathname?.startsWith('/manage')

	if (!isProtectedRoute && !isAdminRoute) return <>{children}</>

	if (user?.isAdmin) return <>{children}</>

	if (user && isProtectedRoute) return <>{children}</>

	if (user && isAdminRoute) return <NotFound />

	if (pathname !== '/auth') return <Auth />

	return <>{children}</>
}

export default AuthProvider
