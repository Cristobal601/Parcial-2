// src/middlewares/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err);

  // Si el error ya tiene un status, lo usamos. Si no, 500 por defecto.
  const status = err.status || 500;

  // Si el error viene de Sequelize con validaciones
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const mensajes = err.errors.map(e => e.message);
    return res.status(400).json({ error: true, mensaje: mensajes.join(', ') });
  }

  // Respuesta genérica
  res.status(status).json({
    error: true,
    mensaje: err.message || 'Error interno del servidor'
  });
}

module.exports = errorHandler;
