import React from 'react';

export default function Cargando({ mensaje = 'Cargando...' }) {
  return (
    <div className="cargando">
      <div className="spinner" aria-hidden="true" />
      <span>{mensaje}</span>
    </div>
  );
}
