// src/routes.jsx
// CORRECCIÓN: Aseguramos que la importación use la mayúscula 'Tracking'
import Tracking from './pages/Tracking.jsx'; 

export const appRoutes = [
  {
    path: '/', 
    component: Tracking,
    title: 'Registro de Horas (Abril 2025)',
  },
  {
    path: '/tracking',
    component: Tracking,
    title: 'Registro de Horas (Abril 2025)',
  },
];

export const getActiveRoute = (path) => {
    const route = appRoutes.find(r => r.path === path);
    if (route) return route;

    return appRoutes.find(r => r.path === '/tracking') || appRoutes[0];
};
