"use client"

import React from 'react';
import { DrawerProvider, useDrawer } from '../drawer/DrawerProvider';
import DrawerOverlay from '../drawer/DrawerOverlay';

// Monta el overlay escuchando el estado del provider
function DrawerMount() {
  const { open, closeDrawer } = useDrawer();
  return <DrawerOverlay open={open} onClose={closeDrawer} />;
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DrawerProvider>
      {children}
      <DrawerMount />
    </DrawerProvider>
  );
}
