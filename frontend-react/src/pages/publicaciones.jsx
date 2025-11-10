import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api.js';
import Cargando from '../components/Cargando.jsx';
import FormularioPublicacion from '../FormularioPublicacion.jsx';


export default function Publicaciones() {
  const { id } = useParams();
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        setCargando(true);
        const [pubRes, userRes] = await Promise.all([
          api.get(`/usuarios/${id}/publicaciones`),
          api.get(`/usuarios/${id}`)
        ]);
        if (!mounted) return;
        setPublicaciones(pubRes.data || []);
        setUsuario(userRes.data || null);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las publicaciones.');
      } finally {
        if (mounted) setCargando(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [id]);

  const publicacionesFiltradas = publicaciones.filter(p =>
    p.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  if (cargando) return <Cargando mensaje="Cargando publicaciones..." />;
  if (error) return (
    <section>
      <h2>Publicaciones</h2>
      <p className="error">{error}</p>
      <Link to="/usuarios" className="btn-link">Volver a usuarios</Link>
    </section>
  );

  return (
    <section>
      <header className="pub-header">
        <h2>Publicaciones de {usuario?.nombre || `Usuario ${id}`}</h2>
        <Link to="/usuarios" className="btn-link">Volver a usuarios</Link>
      </header>
      
          {/* ✅ Formulario para crear publicación */}
      <FormularioPublicacion
        usuarioId={parseInt(id)}
        onCreada={(nueva) => setPublicaciones(prev => [...prev, nueva])}
      />

      <div style={{ margin: '12px 0' }}>
        <input
          type="text"
          placeholder="Filtrar por título..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          style={{ padding: '8px', width: '100%', maxWidth: '400px' }}
        />
      </div>

      {publicacionesFiltradas.length === 0 ? (
        <p>No hay publicaciones que coincidan con el filtro.</p>
      ) : (
        <ul className="list-publicaciones">
          {publicacionesFiltradas.map(p => (
            <li key={p.id} className="publicacion-item">
              <h3>{p.titulo}</h3>
              <p>{p.cuerpo.slice(0, 120)}{p.cuerpo.length > 120 ? '...' : ''}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
