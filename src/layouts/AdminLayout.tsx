import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/ui/sidebar';
import Topbar from '../components/Topbar';
import { DrawerProvider, useDrawer } from '../components/drawer/DrawerProvider';
import DrawerOverlay from '../components/drawer/DrawerOverlay';

function DrawerMount() {
  // Monta el overlay con el estado del provider
  const { open, closeDrawer } = useDrawer();
  return <DrawerOverlay open={open} onClose={closeDrawer} />;
}

export default function AdminLayout() {
  return (
    <DrawerProvider>
      <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', gridTemplateRows:'56px 1fr', height:'100%' }}>
        <div style={{ gridRow:'1 / span 2' }}><Sidebar /></div>
        <div><Topbar /></div>
        <main style={{ padding:16, overflow:'auto' }}>
          <Outlet />
        </main>
      </div>
      <DrawerMount />
    </DrawerProvider>
  );
}
