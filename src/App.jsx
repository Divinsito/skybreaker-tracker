// src/App.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, Sun, AlertTriangle } from 'lucide-react'; 
import { getActiveRoute } from './routes';
import { appRoutes } from './routes'; 

function App() {
  // Tema CLARO forzado (isDarkMode = false)
  const isDarkMode = false;
  
  const [currentPath, setCurrentPath] = useState('/tracking'); 

  const navigate = useCallback((path) => {
    setCurrentPath(path);
  }, []);

  const activeRoute = useMemo(() => {
    const path = currentPath === '/' ? '/tracking' : currentPath;
    return getActiveRoute(path); 
  }, [currentPath]);

  const ActiveComponent = activeRoute.component;
  const pageTitle = activeRoute.title;

  return (
    // Fondo base CLARO (bg-gray-50)
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 transition-colors duration-200">
        
        <header className="mb-8 p-4 bg-white rounded-b-xl shadow-lg border-b-4 border-indigo-600 sticky top-0 z-10 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Calendar className="w-7 h-7 mr-3 text-indigo-500" />
                    <button 
                        onClick={() => navigate('/tracking')}
                        className="text-2xl font-extrabold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                        Tracking de Horas
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Ícono de sol para indicar el tema CLARO */}
                    <span className="text-gray-500 cursor-default"><Sun className="w-6 h-6" /></span>
                </div>
            </div>
            
            <nav className="mt-4 border-t border-gray-200 pt-2">
                <p className="text-sm font-medium text-gray-600">
                    Página Actual: <span className="text-indigo-500">{pageTitle}</span>
                </p>
            </nav>
        </header>


        <main>
          <ActiveComponent />
        </main>

        <footer className="mt-10 pb-10 text-center text-sm text-gray-500 max-w-4xl mx-auto">
            <p>Hecho con React y Tailwind CSS.</p>
            <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 text-xs rounded-lg flex items-center justify-center border border-yellow-300">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Los datos son almacenados localmente en su navegador (LocalStorage).
            </div>
        </footer>
    </div>
  );
}

export default App;