const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// Modelo Comentario
module.exports = (sequelize) => {
  return sequelize.define('Comentario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    publicacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'El publicacionId es obligatorio' },
        isInt: { msg: 'El publicacionId debe ser un número entero' }
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede estar vacío' },
        notNull: { msg: 'El nombre es obligatorio' }
      }
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'El correo debe tener formato válido' },
        notEmpty: { msg: 'El correo no puede estar vacío' },
        notNull: { msg: 'El correo es obligatorio' }
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
    tableName: 'Comentarios'
  });

};