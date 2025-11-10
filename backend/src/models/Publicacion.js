const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// Modelo Publicacion
module.exports = (sequelize) => {
  return sequelize.define('Publicacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true, // importante para que se pueda setear en null al borrar usuario
    validate: {
      isInt: { msg: 'El usuarioId debe ser un número entero' }
    }
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El título no puede estar vacío' },
      notNull: { msg: 'El título es obligatorio' }
    }
  },
  cuerpo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El cuerpo no puede estar vacío' },
      notNull: { msg: 'El cuerpo es obligatorio' }
    }
  }
}, {
  timestamps: false,
  tableName: 'Publicaciones'
});

};
