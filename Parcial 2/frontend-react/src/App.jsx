import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Inicio from './pages/inicio.jsx';
import Usuarios from './pages/usuarios.jsx';
import Publicaciones from './pages/publicaciones.jsx';
import Error404 from './pages/error404.jsx';
import './styless/App.css';

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/:id/publicaciones" element={<Publicaciones />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
}
