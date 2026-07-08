import Seminars from '@/components/sections/Seminars';

export const metadata = {
  title: 'Seminários | Renzo Gracie Aclimação',
  description: 'Confira e participe dos próximos seminários da Renzo Gracie Aclimação.',
};

export default function SeminarsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
      <Seminars />
    </main>
  );
}
