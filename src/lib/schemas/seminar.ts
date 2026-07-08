import { z } from "zod";

/**
 * Regex for Brazilian phone numbers
 * Supports: (11) 99999-9999, 11 99999-9999, 11999999999, etc.
 */
const phoneRegex = /^\(?([1-9]{2})\)?\s?(?:9\d{4}|\d{4})-?\d{4}$/;

/**
 * Schema for Seminar data validation
 */
export const SeminarSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres").max(100, "O título deve ter no máximo 100 caracteres"),
  instructor: z.string().min(3, "O nome do instrutor deve ter pelo menos 3 caracteres").max(100, "O nome do instrutor deve ter no máximo 100 caracteres"),
  instructorImage: z.string().url("A imagem do instrutor deve ser uma URL válida"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Horário deve estar no formato HH:mm"),
  location: z.string().min(3, "O local deve ser informado"),
  maxCapacity: z.number().int().positive("A capacidade máxima deve ser um número positivo"),
});

/**
 * Schema for Seminar Registration validation
 */
export const SeminarRegistrationSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().refine((val) => phoneRegex.test(val), {
    message: "Telefone inválido. Use o formato (11) 99999-9999",
  }),
  seminarId: z.string().cuid("ID do seminário inválido"),
});

// Types inferred from schemas
export type Seminar = z.infer<typeof SeminarSchema>;
export type SeminarRegistration = z.infer<typeof SeminarRegistrationSchema>;