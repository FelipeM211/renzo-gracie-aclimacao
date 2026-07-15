import { headers } from 'next/headers'

export async function verifyAdminAuth(): Promise<boolean> {
  const headersList = await headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) return false

  const [type, token] = authHeader.split(' ')

  if (type !== 'Bearer' || !token) return false

  const adminToken = process.env.ADMIN_TOKEN
  if (!adminToken) return false

  return token === adminToken
}