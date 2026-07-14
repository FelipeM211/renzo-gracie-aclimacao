import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.registration.deleteMany()
  await prisma.seminar.deleteMany()

  const seminars = await Promise.all([
    prisma.seminar.create({
      data: {
        title: 'Introdução ao Jiu-Jitsu',
        instructorName: 'Mestre Renzo',
        description: 'Aprenda os fundamentos básicos do Jiu-Jitsu.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '10:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 20,
      },
    }),
    prisma.seminar.create({
      data: {
        title: 'Defesa Pessoal Feminina',
        instructorName: 'Professora Ana Silva',
        description: 'Técnicas práticas de proteção para mulheres.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: '14:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 15,
      },
    }),
    prisma.seminar.create({
      data: {
        title: 'Técnicas Avançadas de Passagem de Guarda',
        instructorName: 'Mestre Thiago',
        description: 'Seminário intensivo para nível intermediário.',
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        time: '16:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 25,
      },
    }),
  ])

  console.log(`Created ${seminars.length} seminars`)
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