export const accentColor = '#E30B13'
export const bgColor = '#191b1f'

export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'
export const IS_PRODCTION = process.env.APP_ENV === 'production'
