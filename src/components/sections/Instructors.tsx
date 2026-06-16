"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const instructors = [
  {
    id: 1,
    name: "Antonio Gonçalves Júnior",
    rank: "Faixa Preta 4º Grau",
    bio: "Especializado em TEA, professor inclusivo e capacitado diretamente por Rodrigo Brivio. Trabalha com metodologia adaptada para acolher todos os alunos.",
    image: "/antonio.png",
    highlights: ["Especialista em TEA", "Capacitado por Rodrigo Brivio"],
  },
  {
    id: 2,
    name: "Thiago Chang",
    rank: "Faixa Roxa 4º Grau",
    bio: "Professor de Jiu-Jitsu infantil e Yoga. Seu trabalho une movimento, respiração e consciência corporal, cultivando disciplina e confiança.",
    image: "/thiago.png",
    highlights: ["Jiu-Jitsu Infantil", "Yoga & Consciência"],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Instructors() {
  return (
    <section id="equipe" className="bg-zinc-950 py-24">
      <div className="container-site">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">Nossa Equipe</h2>
          <p className="mt-4 text-zinc-400">Linhagem direta e excelência pedagógica.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {instructors.map((prof) => (
            <motion.div
              key={prof.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50"
            >
              <div className="relative aspect-4/5 w-full">
                <Image
                  src={prof.image}
                  alt={prof.name}
                  fill
                  className="object-cover grayscale transition-all group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    {prof.rank}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-white">{prof.name}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-zinc-400 leading-relaxed">{prof.bio}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {prof.highlights.map((h) => (
                    <span key={h} className="rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}