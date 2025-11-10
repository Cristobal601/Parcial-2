import { useNavigate } from 'react-router-dom';

export default function UsuarioCard({ usuario }) {
  const navigate = useNavigate();

  return (
    <div className="usuario-card">
      <h3>{usuario.nombre}</h3>
      <p><strong>Correo:</strong> {usuario.correo}</p>
      <p><strong>Ciudad:</strong> {usuario.ciudad}</p>
      <button
        className="btn-ver-publicaciones"
        onClick={() => navigate(`/usuarios/${usuario.id}/publicaciones`)}
      >
        Ver publicaciones
      </button>

    </div>
  );
}
