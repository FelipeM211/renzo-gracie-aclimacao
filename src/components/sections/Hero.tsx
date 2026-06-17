"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-zinc-950">
      <Image
        src="/hero-bg.png"
        alt="Renzo Gracie Aclimação"
        fill
        priority
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      
      <div className="container-site relative z-10 flex min-h-[90vh] flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-bold text-blue-400">
            <Shield size={16} />
            <span>Jiu-Jitsu Renzo Gracie Aclimação</span>
          </div>
          <h1 className="mt-8 text-5xl font-black text-white md:text-7xl leading-[1.1]">
            Treine na <span className="text-blue-400">Fonte.</span><br />
            O Legado Gracie.
          </h1>
          <p className="mt-6 text-lg text-zinc-400 md:text-xl max-w-xl">
            Aprenda com a tradição e transforme sua vida através do Jiu-Jitsu no coração da Aclimação.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
          href="https://wa.me/551132094445?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20na%20Renzo%20Gracie%20Aclima%C3%A7%C3%A3o"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-4 text-sm font-semibold uppercase tracking-wide transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          Agendar Aula Experimental
        </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}