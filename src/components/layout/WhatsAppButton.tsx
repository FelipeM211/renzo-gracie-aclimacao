import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '551132094445';
const PREDEFINED_MESSAGE = 'Olá! Gostaria de saber mais sobre as aulas e planos da Renzo Gracie Aclimação.';

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREDEFINED_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
      <MessageCircle className="relative h-7 w-7 fill-current" />
    </a>
  );
}