const Sequelize = require('sequelize');

const db = new Sequelize('gym', 'postgres', '1005', { 
  //usuario ycontraseña son tus credenciales local MySQL
  host: 'localhost',
  dialect: 'postgres'
});

// IIFE
(async function () {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

const { DataTypes } = require('sequelize');

const Ejercicio = db.define('Ejercicio', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  series: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  repeticiones: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  descanso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
}, { timestamps: true });

try {
  Ejercicio.sync()
} catch (err) {
  console.log(`Error en la sicnronizacion`, err);
}
module.exports = { Ejercicio }
