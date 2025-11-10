const { Sequelize } = require('sequelize');

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database.sqlite', // Archivo local de base de datos
  logging: false // Desactiva logs SQL en consola
});

// Importar modelos
const Usuario = require('./models/Usuario')(sequelize);
const Publicacion = require('./models/Publicacion')(sequelize);
const Comentario = require('./models/Comentario')(sequelize);

// Relación: una publicación pertenece a un usuario
Usuario.hasMany(Publicacion, { foreignKey: {name: 'usuarioId', allowNull: true} ,
                                        onDelete: 'SET NULL',onUpdate: 'CASCADE'}
);
Publicacion.belongsTo(Usuario, { foreignKey: {name: 'usuarioId' , allowNull: true} });

// Relación: un comentario pertenece a una publicación
Publicacion.hasMany(Comentario, { foreignKey: 'publicacionId' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

// Función para probar la conexión
async function probarConexion() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a SQLite establecida correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar con SQLite:', error);
  }
}

probarConexion();

module.exports = {  sequelize, 
                    Usuario, 
                    Publicacion, 
                    Comentario
 };
