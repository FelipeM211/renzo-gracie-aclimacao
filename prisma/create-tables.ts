import { createClient } from '@libsql/client'
import 'dotenv/config'

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
})

async function main() {
  const statements = [
    `CREATE TABLE IF NOT EXISTS "Seminar" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "instructorName" TEXT NOT NULL,
      "instructorImage" TEXT,
      "description" TEXT,
      "date" DATETIME NOT NULL,
      "time" TEXT,
      "location" TEXT NOT NULL,
      "capacity" INTEGER,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS "Registration" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "seminarId" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Registration_seminarId_fkey" FOREIGN KEY ("seminarId") REFERENCES "Seminar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Registration_seminarId_email_key" ON "Registration"("seminarId", "email")`,
  ]

  for (const stmt of statements) {
    console.log('Executing:', stmt.slice(0, 50) + '...')
    await client.execute(stmt)
  }

  console.log('✓ Tables created successfully!')
}

main().catch(console.error)