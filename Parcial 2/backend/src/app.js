const express = require('express');
const app = express();
const { sequelize } = require('./db');

// Configuración de CORS
const cors = require('cors');
app.use(cors());

// Middlewares
app.use(express.json());

// Rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const publicacionesRoutes = require('./routes/publicaciones.routes');
const comentariosRoutes = require('./routes/comentarios.routes');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Middleware 404 para rutas inexistentes
app.use((req, res, next) => {
  res.status(404).json({ error: true, mensaje: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Sincronizar modelos y levantar servidor
sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:4000');
  });
});
