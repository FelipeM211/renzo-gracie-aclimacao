require('dotenv').config({ path: '.env.local' });

const Database = require('better-sqlite3');
const path = require('path');

async function main() {
  const dbPath = path.join(process.cwd(), 'dev.db');
  console.log('Database path:', dbPath);
  
  const db = new Database(dbPath);

  try {
    // Delete existing data
    db.exec('DELETE FROM Registration;');
    db.exec('DELETE FROM Seminar;');

    // Create sample seminars
    const insertSeminar = db.prepare(`
      INSERT INTO Seminar (id, title, instructorName, instructorImage, description, date, time, location, capacity, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const seminars = [
      {
        title: 'Introdução ao Jiu-Jitsu',
        instructorName: 'Mestre Renzo',
        instructorImage: 'https://via.placeholder.com/400x300?text=Mestre+Renzo',
        description: 'Aprenda os fundamentos básicos do Jiu-Jitsu com técnicas essenciais para iniciantes. Não é necessária experiência prévia.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '10:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 20,
      },
      {
        title: 'Defesa Pessoal Feminina',
        instructorName: 'Professora Ana Silva',
        instructorImage: 'https://via.placeholder.com/400x300?text=Professora+Ana',
        description: 'Seminário especial de defesa pessoal para mulheres. Aprenda técnicas práticas e seguras para proteção.',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: '14:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 15,
      },
      {
        title: 'Técnicas Avançadas de Passagem de Guarda',
        instructorName: 'Mestre Thiago',
        instructorImage: 'https://via.placeholder.com/400x300?text=Mestre+Thiago',
        description: 'Um seminário intensivo sobre técnicas avançadas de passagem de guarda. Nível intermediário em diante.',
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        time: '16:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 25,
      },
      {
        title: 'Jiu-Jitsu para Crianças',
        instructorName: 'Professor João',
        instructorImage: 'https://via.placeholder.com/400x300?text=Professor+Joao',
        description: 'Seminário especial para crianças de 6 a 12 anos. Foco em técnicas seguras, disciplina e diversão.',
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        time: '15:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 30,
      },
      {
        title: 'Preparação para Competição',
        instructorName: 'Mestre Renzo',
        instructorImage: 'https://via.placeholder.com/400x300?text=Mestre+Renzo',
        description: 'Prepare-se para sua primeira competição de Jiu-Jitsu. Técnicas, estratégia e mentalidade competitiva.',
        date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        time: '11:00',
        location: 'Renzo Gracie Aclimação',
        capacity: 20,
      },
    ];

    let count = 0;
    for (const seminar of seminars) {
      const now = new Date();
      const id = Math.random().toString(36).substr(2, 9); // Simple ID generation
      insertSeminar.run(
        id,
        seminar.title,
        seminar.instructorName,
        seminar.instructorImage,
        seminar.description,
        seminar.date.toISOString(),
        seminar.time,
        seminar.location,
        seminar.capacity,
        now.toISOString(),
        now.toISOString()
      );
      count++;
    }

    console.log(`✓ Created ${count} seminars`);
  } catch (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
  } finally {
    db.close();
  }
}

main();
