"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendes",
    role: "Aluno há 2 anos",
    text: "A Renzo Gracie Aclimação mudou minha vida. O treino é intenso, mas a atenção dos professores faz toda a diferença para quem está começando.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fernanda Lima",
    role: "Aluna há 8 meses",
    text: "Ambiente super acolhedor para mulheres. O Jiu-Jitsu me deu confiança e força que eu não imaginava ter.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ricardo Souza",
    role: "Faixa azul",
    text: "Já treinei em várias academias, mas aqui a qualidade técnica e o senso de comunidade são incomparáveis.",
    rating: 5,
  },
  {
    id: 4,
    name: "Amanda Rocha",
    role: "Aluna há 1 ano",
    text: "A estrutura é excelente, os horários são flexíveis e a metodologia respeita o ritmo de cada aluno. Recomendo demais!",
    rating: 5,
  },
  {
    id: 5,
    name: "Bruno Alves",
    role: "Aluno há 3 anos",
    text: "Treinar na Renzo Gracie Aclimação é uma experiência completa. Jiu-Jitsu, condicionamento físico e amizades que levamos para a vida toda.",
    rating: 5,
  },
  {
    id: 6,
    name: "Juliana Torres",
    role: "Aluna há 6 meses",
    text: "Comecei do zero e hoje me sinto segura em treinar com qualquer parceiro. O aprendizado é contínuo e respeitoso.",
    rating: 5,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 lg:px-8">
      <div className="bg-radial-at-tr absolute inset-0 from-zinc-800/30 to-black" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            O que dizem nossos alunos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Histórias reais de quem treina na Renzo Gracie Aclimação.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 gap-6 md:columns-2 lg:columns-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-base leading-relaxed text-zinc-300">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-blue font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}