import { NextRequest, NextResponse } from 'next/server'

// VERCEL_ENV
// The Environment that the app is deployed an running on. The value can be either production, preview, or development.

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (
    basicAuth &&
    (process.env.VERCEL_ENV === 'development' ||
      process.env.VERCEL_ENV === 'preview')
  ) {
    const auth = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

    if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
  }

  if (process.env.VERCEL_ENV === 'production') {
    return NextResponse.next()
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
