"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface Seminar {
  id: string;
  title: string;
  instructorName: string;
  instructorImage: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  registered: number;
}

interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
}

interface RegistrationFormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const DEFAULT_LOCATION = "Renzo Gracie Aclimação";

const formatDate = (date: string) => {
  try {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
};

const validateForm = (form: RegistrationForm): RegistrationFormErrors => {
  const errors: RegistrationFormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Nome é obrigatório.";
  } else if (form.name.trim().length < 3) {
    errors.name = "Informe seu nome completo.";
  }

  if (!form.email.trim()) {
    errors.email = "Email é obrigatório.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Informe um email válido.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Telefone é obrigatório.";
  } else {
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      errors.phone = "Informe um telefone válido com DDD.";
    }
  }

  return errors;
};

export default function Seminars() {
  const { toast } = useToast();
  const initialMountRef = useRef(true);

  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [form, setForm] = useState<RegistrationForm>({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<RegistrationFormErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchSeminars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/seminars", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Erro ao carregar seminários (${res.status}).`);
      }
      const data = (await res.json()) as Seminar[];
      setSeminars(Array.isArray(data) ? data : []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível carregar os seminários.";
      setError(message);
      setSeminars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      fetchSeminars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openRegistration = (seminar: Seminar) => {
    setSelectedSeminar(seminar);
    setForm({ name: "", email: "", phone: "" });
    setFormErrors({});
    setModalOpen(true);
  };

  const closeRegistration = () => {
    if (submitting) return;
    setModalOpen(false);
    setSelectedSeminar(null);
    setForm({ name: "", email: "", phone: "" });
    setFormErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof RegistrationForm
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeminar) return;

    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/seminars/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seminarId: selectedSeminar.id,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          (data && (data.message || data.error)) ||
          `Erro ao realizar inscrição (${res.status}).`;
        throw new Error(message);
      }

      toast(
        "Inscrição realizada com sucesso!",
        `Você se inscreveu em "${selectedSeminar.title}".`
      );

      setModalOpen(false);
      setSelectedSeminar(null);
      setForm({ name: "", email: "", phone: "" });
      setFormErrors({});

      await fetchSeminars();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível concluir a inscrição.";
      toast("Erro na inscrição", message, "destructive");
    } finally {
      setSubmitting(false);
    }
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <div className="flex flex-1 flex-col gap-3 p-5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-16 w-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-2 h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderError = () => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center"
    >
      <p className="text-sm text-destructive" role="alert">
        {error || "Ocorreu um erro ao carregar os seminários."}
      </p>
      <Button onClick={fetchSeminars} variant="outline">
        Tentar novamente
      </Button>
    </motion.div>
  );

  const renderEmpty = () => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center"
    >
      <p className="text-base font-medium text-foreground">
        Nenhum seminário disponível
      </p>
      <p className="text-sm text-muted-foreground">
        Volte mais tarde para conferir novas datas.
      </p>
    </motion.div>
  );

  const renderSeminars = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {seminars.map((seminar) => {
        const spotsLeft = Math.max(0, seminar.capacity - seminar.registered);
        const isFull = spotsLeft === 0;
        const location = seminar.location || DEFAULT_LOCATION;

        return (
          <motion.article
            key={seminar.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4 }}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              {seminar.instructorImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={seminar.instructorImage}
                  alt={seminar.instructorName}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                  Sem imagem
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground">
                {seminar.title}
              </h3>

              <p className="text-sm font-medium text-muted-foreground">
                Instrutor: {seminar.instructorName}
              </p>

              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span>
                  <span className="font-medium text-foreground">Data:</span>{" "}
                  {formatDate(seminar.date)}
                  {seminar.time ? ` às ${seminar.time}` : ""}
                </span>
                <span>
                  <span className="font-medium text-foreground">Local:</span> {location}
                </span>
              </div>

              <p className="line-clamp-3 text-sm text-muted-foreground">
                {seminar.description}
              </p>

              <div className="mt-1 flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    isFull ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {seminar.registered}/{seminar.capacity} inscritos
                </span>
                {isFull ? (
                  <span className="text-xs font-medium uppercase tracking-wide text-destructive">
                    Esgotado
                  </span>
                ) : (
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {spotsLeft} {spotsLeft === 1 ? "vaga" : "vagas"}
                  </span>
                )}
              </div>

              <Button
                className="mt-2 w-full"
                onClick={() => openRegistration(seminar)}
                disabled={isFull}
              >
                {isFull ? "Vagas esgotadas" : "Inscrever-se"}
              </Button>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Seminários
        </h2>
        <p className="text-sm text-muted-foreground">
          Inscreva-se nos próximos seminários realizados na {DEFAULT_LOCATION}.
        </p>
      </header>

      {loading && renderSkeletons()}
      {!loading && error && renderError()}
      {!loading && !error && seminars.length === 0 && renderEmpty()}
      {!loading && !error && seminars.length > 0 && renderSeminars()}

      <Dialog open={modalOpen} onOpenChange={(open) => (open ? setModalOpen(true) : closeRegistration())}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Inscrição no seminário</DialogTitle>
            <DialogDescription>
              {selectedSeminar
                ? `Preencha seus dados para se inscrever em "${selectedSeminar.title}".`
                : "Preencha seus dados para confirmar sua inscrição."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => handleInputChange(e, "name")}
                disabled={submitting}
                aria-invalid={!!formErrors.name}
                placeholder="Seu nome completo"
              />
              {formErrors.name && (
                <p className="text-xs text-destructive">{formErrors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => handleInputChange(e, "email")}
                disabled={submitting}
                aria-invalid={!!formErrors.email}
                placeholder="voce@email.com"
              />
              {formErrors.email && (
                <p className="text-xs text-destructive">{formErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => handleInputChange(e, "phone")}
                disabled={submitting}
                aria-invalid={!!formErrors.phone}
                placeholder="(11) 99999-9999"
              />
              {formErrors.phone && (
                <p className="text-xs text-destructive">{formErrors.phone}</p>
              )}
            </div>

            <DialogFooter className="mt-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeRegistration}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Confirmando..." : "Confirmar Inscrição"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}