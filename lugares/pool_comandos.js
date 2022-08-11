const { Pool } = require('pg')

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'lugares',
  password: '1005',
  min: 3,
  max: 6,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
  port: 5432
}
const pool = new Pool(config)


// Funciones para acceder a la base de datos 'lugares'
async function mostrarLugares () {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL
  const respuesta = await client.query('select * from lugares')
  console.log(respuesta.rows);

  // 3. Devuelvo el cliente al pool
  client.release()
  pool.end()
}

async function nuevoLugar (nombre, lat, long) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL
  const resp = await client.query(`insert into lugares (nombre, lat, long) values ('${nombre}', ${lat}, ${long}) returning *`)

  // 3. Devuelvo el cliente al pool
  client.release()
  pool.end()
}

async function mostrarDistancia(id_lugar1, id_lugar2) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto las consultas SQL
  let lugar1 = await client.query(`select * from lugares where id=${id_lugar1}`)
  lugar1 = lugar1.rows[0]

  let lugar2 = await client.query(`select * from lugares where id=${id_lugar2}`)
  lugar2 = lugar2.rows[0]

  // Se calcula la distancia entre los 2 lugares
  let distancia = get_distancia(lugar1.lat, lugar1.long, lugar2.lat, lugar2.long)
  distancia = Math.round(distancia)
  
  console.log(`La distancia entre ${lugar1.nombre} y ${lugar2.nombre} es de ${distancia} Kms.`);
  
  // 3. Devuelvo el cliente al pool
  client.release()
  pool.end()
}

// Interacción con el usuario
const accion = process.argv[2]

if (accion == 'mostrar') {
  mostrarLugares()
}
else if (accion == 'crear') {

  const nombre = process.argv[3]
  const lat = process.argv[4]
  const long = process.argv[5]

  nuevoLugar(nombre, lat, long)
}
else if (accion == 'distancia') {

  const id_lugar1 = process.argv[3]
  const id_lugar2 = process.argv[4]

  mostrarDistancia(id_lugar1, id_lugar2)
}
else {
  console.log(`Acción ${accion} no implementada`);
}