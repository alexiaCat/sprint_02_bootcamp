const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");


const Bootcamp = sequelize.define('Bootcamp', {
  title: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: "El campo nombre (title) es requerido"
      },
    },
  },
  cue: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        args: true,
        msg: "Números de CUE es necesario, minimo 5 y máximo 20"
      },
      isInt: {
        args: true,
        msg: "Debes introducir un número entero"
      },
      max: 20,
      min: 5,
    },
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: "Se debe introducir una descripción"
      },
    },
  }

}, {
  tableName: 'bootcamps',
  timestamps: true,
})

module.exports = {
   Bootcamp
}