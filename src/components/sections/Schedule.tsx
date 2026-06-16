"use client";

const scheduleData = [
  { time: '06:00', mon: 'Jiu-Jitsu', tue: 'Jiu-Jitsu', wed: 'Jiu-Jitsu', thu: 'Jiu-Jitsu', fri: 'Jiu-Jitsu', sat: 'Jiu-Jitsu' },
  { time: '12:00', mon: 'Jiu-Jitsu', tue: 'Jiu-Jitsu', wed: 'Jiu-Jitsu', thu: 'Jiu-Jitsu', fri: 'Jiu-Jitsu', sat: '-' },
  { time: '19:00', mon: 'Jiu-Jitsu', tue: 'Jiu-Jitsu', wed: 'Jiu-Jitsu', thu: 'Jiu-Jitsu', fri: 'Jiu-Jitsu', sat: 'Jiu-Jitsu' },
];

export function Schedule() {
  return (
    <section id="horarios" className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-5xl text-slate-900">Grade de Horários</h2>
          <p className="mt-4 text-slate-600">Encontre o melhor momento para o seu treino.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">Horário</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Segunda</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Terça</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quarta</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quinta</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Sexta</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Sábado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {scheduleData.map((row) => (
                <tr key={row.time} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-slate-900">{row.time}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.mon}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.tue}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.wed}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.thu}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.fri}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.sat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}