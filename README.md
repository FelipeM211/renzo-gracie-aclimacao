# Renzo Gracie Aclimação

Landing page institucional da academia Renzo Gracie Aclimação, com foco em apresentação da equipe, programas, horários, depoimentos e captação de contatos via WhatsApp.

## Visão geral

O projeto é construído com Next.js 16 e React 19, usando App Router, Tailwind CSS 4 e Framer Motion para animações de interface. A home é composta por seções de alto impacto visual e CTAs para aula experimental.

### O que a página entrega

- Hero com chamada principal e botão para agendar aula experimental.
- Seção de programas com Jiu-Jitsu infantil, feminino e adulto.
- Apresentação da equipe técnica.
- Grade de horários.
- Depoimentos de alunos.
- FAQ com dúvidas frequentes.
- Botão flutuante de WhatsApp para contato rápido.

### SEO e metadata

O projeto já inclui metadata global, Open Graph, Twitter Card, robots e schema de negócio em `src/lib/seo-config.ts`, além de configurações de viewport e segurança em `src/app/layout.tsx`.

## Stack

- Next.js 16.2.9
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- React Icons

## Pré-requisitos

- Node.js 18+ ou 20+
- npm, pnpm, yarn ou bun

## Instalação

```bash
npm install
```

## Como rodar

```bash
npm run dev
```

Depois, abra [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run start
npm run lint
```

- `dev`: inicia o servidor de desenvolvimento.
- `build`: gera a versão de produção.
- `start`: executa a aplicação compilada.
- `lint`: roda o ESLint.

## Estrutura do projeto

```text
src/
	app/
		globals.css
		layout.tsx
		page.tsx
	components/
		layout/
			Footer.tsx
			Header.tsx
			WhatsAppButton.tsx
		sections/
			FAQ.tsx
			Hero.tsx
			Instructors.tsx
			Programs.tsx
			Schedule.tsx
			Testimonials.tsx
		ui/
			button.tsx
			card.tsx
			input.tsx
			sheet.tsx
	lib/
		seo-config.ts
		utils.ts
public/
	hero-bg.png
	hero-aclimacao.jpg
	antonio.png
	thiago.png
```

## Conteúdo principal

- `src/app/page.tsx` monta a home e ordena as seções da landing page.
- `src/components/sections/Hero.tsx` concentra a primeira impressão e o CTA principal.
- `src/components/sections/Programs.tsx` descreve os perfis atendidos pela academia.
- `src/components/sections/Instructors.tsx` apresenta a equipe técnica.
- `src/components/sections/Schedule.tsx` exibe a grade de horários.
- `src/components/sections/Testimonials.tsx` mostra provas sociais.
- `src/components/sections/FAQ.tsx` responde dúvidas comuns.
- `src/components/layout/WhatsAppButton.tsx` mantém acesso rápido ao contato.

## Personalização

Se quiser adaptar o projeto para produção, revise principalmente:

- telefones e links de WhatsApp nos componentes de layout e hero;
- textos institucionais e dados da academia;
- imagens em `public/`;
- metadata e schema em `src/lib/seo-config.ts` e `src/app/layout.tsx`.

## Deploy

O projeto está pronto para deploy em plataformas compatíveis com Next.js, como a Vercel.

```bash
npm run build
```

Depois, publique o diretório gerado pela plataforma escolhida ou conecte o repositório diretamente à Vercel.
