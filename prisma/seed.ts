import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const databaseUrl = process.env.DATABASE_URL ?? 'file:./dev.db';
const adapter = new PrismaBetterSqlite3(databaseUrl);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.registration.deleteMany();
  await prisma.seminar.deleteMany();

  // Create sample seminars
  const seminars = await Promise.all([
    prisma.seminar.create({
      data: {
        title: 'Introdução ao Jiu-Jitsu',
        instructorName: 'Mestre Renzo',
        instructorImage: 'https://via.placeholder.com/400x300?text=Mestre+Renzo',
        description: 'Aprenda os fundamentos básicos do Jiu-Jitsu com técnicas essenciais para iniciantes. Não é necessária experiência prévia.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        time: '10:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 20,
      },
    }),
    prisma.seminar.create({
      data: {
        title: 'Defesa Pessoal Feminina',
        instructorName: 'Professora Ana Silva',
        instructorImage: 'https://via.placeholder.com/400x300?text=Professora+Ana',
        description: 'Seminário especial de defesa pessoal para mulheres. Aprenda técnicas práticas e seguras para proteção.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        time: '14:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 15,
      },
    }),
    prisma.seminar.create({
      data: {
        title: 'Técnicas Avançadas de Passagem de Guarda',
        instructorName: 'Mestre Thiago',
        instructorImage: 'https://via.placeholder.com/400x300?text=Mestre+Thiago',
        description: 'Um seminário intensivo sobre técnicas avançadas de passagem de guarda. Nível intermediário em diante.',
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        time: '16:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 25,
      },
    }),
    prisma.seminar.create({
      data: {
        title: 'Jiu-Jitsu para Crianças',
        instructorName: 'Professor João',
        instructorImage: 'https://via.placeholder.com/400x300?text=Professor+Joao',
        description: 'Seminário especial para crianças de 6 a 12 anos. Foco em técnicas seguras, disciplina e diversão.',
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days from now
        time: '15:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 30,
      },
    }),
    prisma.seminar.create({
      data: {
        title: 'Preparação para Competição',
        instructorName: 'Mestre Renzo',
        instructorImage: 'https://via.placeholder.com/400x300?text=Mestre+Renzo',
        description: 'Prepare-se para sua primeira competição de Jiu-Jitsu. Técnicas, estratégia e mentalidade competitiva.',
        date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
        time: '11:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 20,
      },
    }),
  ]);

  console.log(`Created ${seminars.length} seminars`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
