import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <h1 className="brand">Mini-Red Social</h1>
        <nav>
          <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Inicio</NavLink>
          <NavLink to="/usuarios" className={({isActive}) => isActive ? 'active' : ''}>Usuarios</NavLink>
        </nav>
      </div>
    </header>
  );
}
