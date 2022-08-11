const { Client } = require('pg')
const get_distancia = require('./funciones.js')
const config_object = require('./config.js')

/* En ./config.js
const config = {
  user: 'user_postgres',
  host: '123.456.321.422',
  database: 'nombre_db',
  password: 'pass',
  port: PORT
}
*/
const client = new Client(config_object)

client.connect(err => {
  if (err) {
    console.log(err);
  }
})

// Funciones para manejar los lugares
async function nuevoLugar (nombre, lat, long) {


  const resp = await client.query(`insert into lugares (nombre, lat, long) values ('${nombre}', ${lat}, ${long}) returning *`)

  console.log(resp);
  client.end()
}

async function mostrarLugares () {
  const respuesta = await client.query('select * from lugares')
  console.log(respuesta.rows);
  client.end()
}

async function mostrarDistancia(id_lugar1, id_lugar2) {
  let lugar1 = await client.query(`select * from lugares where id=${id_lugar1}`)
  lugar1 = lugar1.rows[0]

  let lugar2 = await client.query(`select * from lugares where id=${id_lugar2}`)
  lugar2 = lugar2.rows[0]

  let distancia = get_distancia(lugar1.lat, lugar1.long, lugar2.lat, lugar2.long)
  distancia = Math.round(distancia)
  
  console.log(`La distancia entre ${lugar1.nombre} y ${lugar2.nombre} es de ${distancia} Kms.`);
  client.end()
}


// Acciones 
//mostrarLugares()
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
