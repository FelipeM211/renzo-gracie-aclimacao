import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SeminarRecord {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  location: string;
  capacity: number | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    registrations: number;
  };
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const seminars = await prisma.seminar.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    const result = (seminars as SeminarRecord[]).map((seminar) => ({
      id: seminar.id,
      title: seminar.title,
      description: seminar.description ?? '',
      date: seminar.date.toISOString(),
      location: seminar.location,
      capacity: seminar.capacity ?? 0,
      registered: seminar._count.registrations,
      createdAt: seminar.createdAt.toISOString(),
      updatedAt: seminar.updatedAt.toISOString(),
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar seminários:', error);
    return NextResponse.json(
      { error: 'Não foi possível carregar os seminários.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      date,
      location,
      capacity,
      instructorName,
      instructorImage,
      time,
    }: {
      title: string;
      description?: string;
      date: string;
      location: string;
      capacity?: number;
      instructorName?: string;
      instructorImage?: string;
      time?: string;
    } = body;

    if (!title || !date || !location) {
      return NextResponse.json(
        { error: 'Os campos title, date e location são obrigatórios.' },
        { status: 400 }
      );
    }

    const seminar = await prisma.seminar.create({
      data: {
        title,
        instructorName: instructorName ?? 'Renzo Gracie Aclimação',
        instructorImage: instructorImage ?? null,
        description,
        date: new Date(date),
        time: time ?? null,
        location,
        capacity,
      },
    });

    return NextResponse.json(seminar, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar seminário:', error);
    return NextResponse.json(
      { error: 'Não foi possível criar o seminário.' },
      { status: 500 }
    );
  }
}