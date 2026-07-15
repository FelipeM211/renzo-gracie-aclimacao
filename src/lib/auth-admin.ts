import { headers } from 'next/headers'

export function verifyAdminAuth(): boolean {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) return false

  const [type, token] = authHeader.split(' ')

  if (type !== 'Bearer' || !token) return false

  const adminToken = process.env.ADMIN_TOKEN
  if (!adminToken) return false

  return token === adminToken
}