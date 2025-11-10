import { useForm } from 'react-hook-form';
import api from './services/api.js';

export default function FormularioPublicacion({ usuarioId, onCreada }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const crearPublicacion = async (data) => {
    try {
      const res = await api.post('/publicaciones', {
        usuarioId,
        titulo: data.titulo,
        cuerpo: data.cuerpo
      });
      onCreada?.(res.data); // callback opcional
      reset();
    } catch (err) {
      console.error('Error al crear publicación:', err);
      alert('No se pudo crear la publicación.');
    }
  };

  return (
    <form onSubmit={handleSubmit(crearPublicacion)} className="formulario">
      <h3>Crear nueva publicación</h3>

      <input
        type="text"
        placeholder="Título"
        {...register('titulo', { required: 'Título requerido' })}
      />
      {errors.titulo && <p className="error">{errors.titulo.message}</p>}

      <textarea
        placeholder="Cuerpo"
        rows={4}
        {...register('cuerpo', { required: 'Cuerpo requerido' })}
      />
      {errors.cuerpo && <p className="error">{errors.cuerpo.message}</p>}

      <button type="submit">Publicar</button>
    </form>
  );
}