const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// Modelo Usuario

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
      unique: true,
      validate: {
        isEmail: { msg: 'El correo debe tener formato válido' },
        notEmpty: { msg: 'El correo no puede estar vacío' },
        notNull: { msg: 'El correo es obligatorio' }
      }
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La ciudad no puede estar vacía' },
        notNull: { msg: 'La ciudad es obligatoria' }
      }
    }
  }, {
    timestamps: false,
    tableName: 'Usuarios'
  });
};
