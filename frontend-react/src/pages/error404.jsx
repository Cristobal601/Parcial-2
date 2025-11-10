import React from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <section style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '0.5em' }}>404</h1>
      <h2 style={{ marginBottom: '0.5em' }}>Página no encontrada</h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5em' }}>
        Lo sentimos, la ruta que estás buscando no existe o fue movida.
      </p>
      <Link to="/" className="btn-link">
        Volver al inicio
      </Link>
    </section>
  );
}
