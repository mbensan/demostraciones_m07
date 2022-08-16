const express = require('express');
const { Ejercicio } = require('./models.js')

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

app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto 3000`);
});