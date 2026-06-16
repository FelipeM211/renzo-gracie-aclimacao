import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/horarios', label: 'Horários' },
    { href: '/planos', label: 'Planos' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-royal-blue/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-(--max-width) items-center justify-between px-4 py-4">
        <Link href="/" onClick={closeMenu} className="text-xl font-bold text-white">
          Renzo Gracie Aclimação
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+5511999999999"
            className="inline-flex items-center gap-2 rounded-md border border-royal-blue/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Ligar
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-royal-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-royal-blue/90"
          >
            Agende aula grátis
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 text-white md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-royal-blue/10 bg-black md:hidden">
          <div className="mx-auto max-w-(--max-width) px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-base font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:+5511999999999"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-royal-blue/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Ligar
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-royal-blue px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-royal-blue/90"
              >
                Agende aula grátis
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}