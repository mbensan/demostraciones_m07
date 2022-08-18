const { DataTypes, sequelize } = require('sequelize');
const db = require('./db_conection.js')

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

const Country = db.define('country', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poblacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

const City = db.define('city', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const Language = db.define('language', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

// Relaciones entre los modelos
Country.hasMany(City)
City.belongsTo(Country)

// Relación muchos a muchos
Country.belongsToMany(Language, {through: 'speak'})
Language.belongsToMany(Country, {through: 'speak'})

try {
  // Ejercicio.sync()
  // Pais.sync()
  // Ciudad.sync()
  // Lenguaje.sync()
  db.sync()
} catch (err) {
  console.log(`Error en la sicnronizacion`, err);
}
module.exports = { Ejercicio, Country, City, Language }
