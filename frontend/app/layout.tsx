import './globals.css';

export const metadata = {
  title: 'Lista de Tareas',
  description: 'Proyecto simple con Next.js y NestJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
