"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    question: "Preciso ter condicionamento físico para começar?",
    answer:
      "Não, o Jiu-Jitsu é para todos. O condicionamento físico vem com o treino, naturalmente e no seu ritmo.",
  },
  {
    question: "Como funciona a primeira aula?",
    answer:
      "É uma aula experimental gratuita onde você conhece a metodologia, os professores e o ambiente da academia.",
  },
  {
    question: "Quais os equipamentos necessários?",
    answer:
      "Para a aula experimental, disponibilizamos o Kimono. Depois, você precisará adquirir o seu próprio.",
  },
  {
    question: "Existe limite de idade?",
    answer:
      "Temos turmas desde o infantil (4 anos) até o adulto, sem limite de idade para começar.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-neutral-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-neutral-400 mb-3">
            Dúvidas comuns
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Tudo o que você precisa saber para dar o primeiro passo com confiança.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-neutral-800 rounded-xl bg-neutral-950/50 overflow-hidden transition-colors hover:border-neutral-700"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-white">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-700 transition-colors ${
                      isOpen ? "bg-white border-white" : "bg-transparent"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-neutral-950" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-300" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="px-6 pb-5 text-neutral-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}