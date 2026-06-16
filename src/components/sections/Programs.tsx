"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Baby, Heart, Users, ChevronRight } from 'lucide-react';

const programs = [
  {
    id: "kids",
    title: "Jiu-Jitsu Infantil",
    description: "Foco em disciplina, coordenação e anti-bullying para crianças a partir de 4 anos.",
    icon: Baby,
    accent: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
  },
  {
    id: "women",
    title: "Jiu-Jitsu Feminino",
    description: "Defesa pessoal e empoderamento em um ambiente estritamente respeitoso.",
    icon: Heart,
    accent: "border-rose-500/20 bg-rose-500/5 text-rose-400",
  },
  {
    id: "adults",
    title: "Jiu-Jitsu Adulto",
    description: "Do iniciante ao competidor, com a metodologia oficial da linhagem Renzo Gracie.",
    icon: Users,
    accent: "border-red-500/20 bg-red-500/5 text-red-400",
  },
] as const;

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id="programas" 
      className="bg-slate-950 py-24 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl font-bold md:text-5xl">Nossos Programas</h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Treinos estruturados para cada perfil, mantendo a tradição e a excelência técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <motion.div
              key={program.id}
              whileHover={{ y: -10 }}
              className={`group rounded-2xl border p-8 transition-all hover:shadow-2xl ${program.accent}`}
            >
              <div className="mb-6 inline-block rounded-xl bg-slate-900 p-4">
                <program.icon size={32} />
              </div>
              <h3 className="mb-4 text-2xl font-bold">{program.title}</h3>
              <p className="mb-8 text-slate-300 leading-relaxed">
                {program.description}
              </p>
              <a 
                href="#contato" 
                className="inline-flex items-center font-semibold hover:gap-2 transition-all"
              >
                Saber mais <ChevronRight size={16} className="ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}