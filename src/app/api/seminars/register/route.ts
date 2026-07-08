import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const SeminarRegistrationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  seminarId: z.string().min(1, "ID do seminário é obrigatório"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = SeminarRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, seminarId } = parsed.data;

    const seminar = await prisma.seminar.findUnique({
      where: { id: seminarId },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!seminar) {
      return NextResponse.json(
        {
          success: false,
          message: "Seminário não encontrado",
        },
        { status: 404 }
      );
    }

    const effectiveCapacity = seminar.capacity ?? 0;

    if (effectiveCapacity > 0 && seminar._count.registrations >= effectiveCapacity) {
      return NextResponse.json(
        {
          success: false,
          message: "Não há vagas disponíveis para este seminário",
        },
        { status: 409 }
      );
    }

    const existingRegistration = await prisma.registration.findUnique({
      where: {
        seminarId_email: {
          seminarId,
          email,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        {
          success: false,
          message: "Este e-mail já está inscrito neste seminário",
        },
        { status: 409 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        name,
        email,
        phone,
        seminarId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inscrição realizada com sucesso",
        data: {
          id: registration.id,
          name: registration.name,
          email: registration.email,
          phone: registration.phone,
          seminarId: registration.seminarId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Este e-mail já está inscrito neste seminário",
        },
        { status: 409 }
      );
    }

    console.error("Erro ao registrar inscrição:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}