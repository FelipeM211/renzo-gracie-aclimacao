import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    const result = seminars.map((seminar) => ({
      id: seminar.id,
      title: seminar.title,
      description: seminar.description,
      date: seminar.date,
      location: seminar.location,
      capacity: seminar.capacity,
      createdAt: seminar.createdAt,
      updatedAt: seminar.updatedAt,
      registrationsCount: seminar._count.registrations,
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
    }: {
      title: string;
      description?: string;
      date: string;
      location: string;
      capacity?: number;
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
        description,
        date: new Date(date),
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