import React from 'react';
import '../app/globals.css';
import AppProviders from '../components/layout/AppProviders';

export const metadata = {
  title: 'CanchaAPP - Admin',
  description: 'Panel de administración de canchas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
