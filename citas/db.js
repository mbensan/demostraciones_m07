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
async function mostrarCitas () {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const respuesta = await client.query('select * from citas')

  // 3. Devuelvo el cliente al pool
  client.release()

  // 4. Retorno la lista de lugares
  return respuesta.rows 
}


async function nuevaCita (nombre, cita) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (ejemplo de consulta parametrizada)
  const resp = await client.query(
    `insert into citas (nombre, cita) values ($1, $2) returning *`,
    [nombre, cita]
  )

  // 3. Devuelvo el cliente al pool
  client.release()
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

async function eliminarCita (id) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta (consulta parametrizada con un Objeto)
  await client.query({
    text: `delete from citas where id=$1`,
    values: [id] 
  })

  // 3. Devuelvo el client al pool
  client.release()
}

async function editarCita (id, nombre, cita) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta (consulta parametrizada con un Objeto)
  await client.query({
    text: `update citas set nombre=$1, cita=$2 where id=$3`,
    values: [nombre, cita, id] 
  })

  // 3. Devuelvo el client al pool
  client.release()
}


module.exports = {
  nuevaCita, mostrarCitas, eliminarCita, editarCita
}