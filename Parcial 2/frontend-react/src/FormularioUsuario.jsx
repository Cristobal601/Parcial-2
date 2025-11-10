import { useForm } from 'react-hook-form';
import api from './services/api.js';

export default function FormularioUsuario({ onCreado }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const crearUsuario = async (data) => {
    try {
      const res = await api.post('/usuarios', data);
      onCreado?.(res.data); // callback opcional
      reset();
    } catch (err) {
      console.error('Error al crear usuario:', err);
      alert('No se pudo crear el usuario.');
    }
  };

  return (
    <form onSubmit={handleSubmit(crearUsuario)} className="formulario">
      <h3>Crear nuevo usuario</h3>

      <input
        type="text"
        placeholder="Nombre"
        {...register('nombre', { required: 'Nombre requerido' })}
      />
      {errors.nombre && <p className="error">{errors.nombre.message}</p>}

      <input
        type="email"
        placeholder="Correo"
        {...register('correo', { required: 'Correo requerido' })}
      />
      {errors.correo && <p className="error">{errors.correo.message}</p>}

      <input
        type="text"
        placeholder="Ciudad"
        {...register('ciudad', { required: 'Ciudad requerida' })}
      />
      {errors.ciudad && <p className="error">{errors.ciudad.message}</p>}

      <button type="submit">Crear</button>
    </form>
  );
}
