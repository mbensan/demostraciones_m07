const express = require('express');
const { Ejercicio, Country, Language } = require('./models.js')

const app = express()

app.use(express.static('public')) // para manejo de archivos estáticos
app.use(express.urlencoded()) // para recibir datos de formulario POST

function getForm(req) {
  return new Promise((res, rej) => {
    let str = "";
    req.on("data", function (chunk) {
      str += chunk;
    });
    req.on("end", function () {
      //console.log('str', str);
      const obj = JSON.parse(str);
      res(obj);
    });
  });
}


app.get('/ejercicios', async (req, res) => {
  const ejercicios = await Ejercicio.findAll()
  res.json({rows: ejercicios})
})

app.post('/ejercicios', async (req, res) => {
  // 1. me traigo los datos del formulario
  const datos = await getForm(req)
  // 2. uso el modelo ppara crear un registro en la base de datos
  await Ejercicio.create({
    nombre: datos.nombre,
    series: datos.series,
    repeticiones: datos.repeticiones,
    descanso: datos.descanso
  })
  console.log(datos);
  res.json({})
})

app.get('/crear/pais', async (req, res) => {
  console.log(req.query);
  await Country.create({
    nombre: req.query.nombre,
    poblacion: 20000000
  })
  const paises = await Country.findAll()
  res.json({paises})
})

app.get('/crear/ciudad', async (req, res) => {
  const nombre_pais = req.query.pais
  const nombre_ciudad = req.query.ciudad

  if (!nombre_pais || !nombre_ciudad) {
    return res.send('Debe ingresar el nombre del pais y la ciudad')
  }

  const pais = await Country.findOne({where: {nombre: nombre_pais}})
  await pais.createCiudad({nombre: nombre_ciudad})

  console.log(pais);
  res.json({mensaje: 'Ciudad creada'})
})

app.post('/lenguaje/crear', async (req, res) => {
  await Language.create({
    nombre: req.body.nombre
  })
  res.redirect('/habla.html')
})

app.get('/datos', async (req, res) => {
  const paises = await Country.findAll()
  const lenguajes = await Language.findAll()

  res.json({ paises, lenguajes })
})

app.post('/unir', async (req, res) => {
  const pais_id = parseInt(req.body.pais_id)
  const lenguaje_id = parseInt(req.body.lenguaje_id)

  if (!pais_id || !lenguaje_id) {
    return res.send('Faltan variables')
  }
  
  const pais = await Country.findByPk(pais_id)
  const lenguaje = await Language.findByPk(lenguaje_id)
  
  await pais.addLanguage(lenguaje, { through: 'habla'})
  return res.send('todo ok')

  res.redirect('/habla.html')
})

app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('Ruta no implementada')
})



app.listen(3000, () => {
  console.log(`Servidor en puerto 3000`);
});