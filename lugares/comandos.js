const { Client } = require('pg')

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'lugares',
  password: '1005',
  port: 5432
}
const client = new Client(config)

client.connect(err => {
  if (err) {
    console.log(err);
  }
})


async function nuevoLugar (nombre, lat, long) {


  const resp = await client.query(`insert into lugares (nombre, lat, long) values ('${nombre}', ${lat}, ${long}) returning *`)

  console.log(resp);
  client.end()
}

nuevoLugar('Parque Nacional Conguillío', -38.69095, -71.67178)

// Ejercicio:
// 1. Agregar por lo menos 3 lugares
// 2. Buscar un lugar en base a su id, y mostrarlo en consola

