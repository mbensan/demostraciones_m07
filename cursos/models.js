const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const db = new Sequelize('cursos', 'postgres', '1005', { 
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
})();


const Curso = db.define('curso', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true })

const Estudiante = db.define('estudiante', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true })

Curso.hasMany(Estudiante)
Estudiante.belongsTo(Curso)

try {
  db.sync()
} catch (err) {
  console.log(`Error en la sicnronizacion`, err);
}

module.exports = { Curso, Estudiante }