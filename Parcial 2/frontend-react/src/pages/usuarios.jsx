import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from '../services/api.js';
import Cargando from '../components/Cargando.jsx';
import UsuarioCard from '../components/UsuarioCard.jsx';
import FormularioUsuario from '../FormularioUsuario.jsx';

Modal.setAppElement('#root'); // ✅ fuera del componente

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false); // ✅ dentro del componente

  useEffect(() => {
    let mounted = true;
    async function fetchUsuarios() {
      try {
        setCargando(true);
        const res = await api.get('/usuarios');
        if (!mounted) return;
        setUsuarios(res.data || []);
      } catch (err) {
        setError('No se pudieron cargar los usuarios.');
        console.error(err);
      } finally {
        if (mounted) setCargando(false);
      }
    }
    fetchUsuarios();
    return () => { mounted = false; };
  }, []);

  if (cargando) return <Cargando mensaje="Cargando usuarios..." />;

  return (
    <section>
      <h2>Usuarios</h2>

      <button onClick={() => setModalAbierto(true)} className="btn-crear">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 5v14m7-7H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Crear nuevo usuario
      </button>


      <Modal
        isOpen={modalAbierto}
        onRequestClose={() => setModalAbierto(false)}
        contentLabel="Crear Usuario"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <FormularioUsuario
          onCreado={(nuevo) => {
            setUsuarios(prev => [...prev, nuevo]);
            setModalAbierto(false);
          }}
        />
      </Modal>

      {error && <p className="error">{error}</p>}

      {usuarios.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <div className="grid-usuarios">
          {usuarios.map(u => <UsuarioCard key={u.id} usuario={u} />)}
        </div>
      )}
    </section>
  );
}
