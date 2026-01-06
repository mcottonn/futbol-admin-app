import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function ContactCard({
  email = 'soporte@canchaapp.com',
  phone = '+54 11 5555-5555',
}: {
  email?: string;
  phone?: string;
}) {
  return (
    <div className="border border-border rounded-xl p-4 mt-2">
      <div className="font-extrabold text-[16px] text-foreground">¿Seguís con dudas?</div>
      <div className="text-sm text-muted mt-1 mb-3">Escribinos o llamanos. Estamos para ayudarte.</div>

      <div className="flex items-center gap-2 mt-2">
        <div className="w-7 h-7 rounded-md grid place-items-center bg-[var(--border)]">
          <Mail className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 font-semibold text-sm text-foreground">{email}</div>
        <a href={`mailto:${email}`} className="btn text-primary border border-primary rounded-lg px-3 py-1 text-xs">
          Enviar mail
        </a>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div className="w-7 h-7 rounded-md grid place-items-center bg-[var(--border)]">
          <Phone className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 font-semibold text-sm text-foreground">{phone}</div>
        <a href={`tel:${phone.replace(/\s|-/g, '')}`} className="btn text-primary border border-primary rounded-lg px-3 py-1 text-xs">
          Llamar
        </a>
      </div>
    </div>
  );
}
