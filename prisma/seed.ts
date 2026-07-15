import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.registration.deleteMany()
  await prisma.seminar.deleteMany()

  const seminar = await prisma.seminar.create({
  data: {
    title: 'Seminário Roberto Godoi',
    instructorName: 'Roberto Godoi',
    instructorImage: '/roberto-godoi.jpg',
    description: 'Uma oportunidade única de aprendizado com um dos grandes nomes do Jiu Jitsu!',
    date: new Date('2026-08-01'),
    time: '10:00',
    duration: '2 horas',
    level: 'Intermediário',
    price: 550.00,
    location: 'Renzo Gracie Aclimação',
    capacity: 25,
  },
})

  console.log(`Created seminar: ${seminar.title}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })