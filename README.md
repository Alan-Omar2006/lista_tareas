# Lista de Tareas

Proyecto simple para presentar el combo: Next.js + NestJS + Prisma + PostgreSQL.

## Ejecutar localmente

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Subir a la nube
- Frontend: Vercel.
- Backend: Render.
- Base de datos: Supabase o Neon.

Variables importantes:
- Backend: `DATABASE_URL`, `FRONTEND_URL`, `PORT`.
- Frontend: `NEXT_PUBLIC_API_URL`.

En Render, usa estos comandos para el backend:
- Build command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
- Start command: `npm run start:prod`
