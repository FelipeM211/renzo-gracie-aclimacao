import { MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-white">Renzo Gracie <span className="text-red-600">Aclimação</span></h3>
            <p className="text-sm text-neutral-400">Legítima Jiu-Jitsu Brasileiro. Disciplina e respeito.</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-neutral-900 hover:bg-red-600 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 hover:bg-red-600 transition-colors"><FaFacebookF size={20} /></a>
              <a href="#" className="p-2 rounded-lg bg-neutral-900 hover:bg-red-600 transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase text-white">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="text-red-600" /> Rua Amarante, 21 - Cambuci, São Paulo</li>
              <li className="flex gap-3"><Phone size={18} className="text-red-600" /> (11) 3209-4445</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          © {currentYear} Renzo Gracie Aclimação. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}