# Sozoano – O Improvável

Projeto completo em `Next.js 15 + TypeScript + Tailwind + shadcn/ui + Framer Motion + Lenis + MongoDB + NextAuth v5 + MDX`.

## Stack

- `Next.js 15` (App Router)
- `Tailwind CSS v4` + `shadcn/ui`
- `Framer Motion` + `Lenis`
- `MongoDB` + `Mongoose`
- `NextAuth v5` (Google + Credentials)
- `MDX` para conteúdo devocional
- `Server Actions` + `API Routes (runtime nodejs)`

## Instalação

```bash
npm install
cp .env.example .env.local
```

## Configuração de ambiente

Preencha em `.env.local`:

- `MONGODB_URI` e `MONGODB_DB`
- `AUTH_SECRET`
- `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`
- `ADMIN_EMAIL` e `ADMIN_PASSWORD_HASH`

Para gerar um hash de senha local:

```bash
node -e "require('bcryptjs').hash('123456',10).then(console.log)"
```

## Rodar em desenvolvimento

```bash
npm run dev
```

## Popular banco com conteúdo inicial

```bash
npm run seed
```

## Estrutura principal

- `src/app` → páginas, layout, rotas de API e SEO (`sitemap.ts`, `robots.ts`)
- `src/components` → componentes visuais e de domínio
- `src/actions` → server actions
- `src/lib` → integração com MongoDB, MDX, repositórios e seed data
- `src/models` → models Mongoose (`Testimonial`, `UserStory`, `Product`, `Devocional`, `Character`)
- `content/devocionais` → conteúdo MDX inicial

## Deploy

Pronto para deploy na Vercel com MongoDB Atlas. Defina as mesmas variáveis de ambiente no painel da Vercel.

## Deploy no Render

### Pode ser estático?

Não para o projeto atual. Este app usa recursos de servidor que exigem runtime Node:

- `NextAuth v5` (sessão/autenticação)
- `API Routes` em `src/app/api/**`
- `Server Actions`
- acesso ao `MongoDB` em runtime

Por isso, no Render a estratégia correta é `Web Service`.

### Arquivo pronto

O projeto já inclui `render.yaml` para deploy via Blueprint.

### Passo a passo (Render)

1. Conecte o repositório no Render.
2. Crie o serviço via Blueprint (`render.yaml`) ou Web Service manual.
3. Defina as variáveis de ambiente:

- `NEXT_PUBLIC_SITE_URL` (URL pública do Render, ex.: `https://sozoano-site.onrender.com`)
- `AUTH_URL` (mesma URL pública)
- `AUTH_TRUST_HOST=true`
- `MONGODB_URI`
- `MONGODB_DB`
- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

4. Build command: `npm install && npm run build`
5. Start command: `npm run start`

### Observação

O `next.config.ts` já está com `output: "standalone"`, que ajuda em ambientes de produção como Render.
