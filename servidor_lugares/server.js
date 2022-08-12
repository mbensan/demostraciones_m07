const express = require('express');
const { nuevoLugar, mostrarLugares } = require('./db.js')

const app = express()

app.use(express.static('public')) // para manejo de archivos estáticos
app.use(express.urlencoded()) // para recibir datos de formulario POST

app.post('/lugares', async (req, res) => {
  console.log(req.body);
  await nuevoLugar(req.body.nombre, req.body.lat, req.body.long)
  res.redirect('/')
})

app.get('/lugares', async (req, res) => {
  const lugares = await mostrarLugares()
  res.json(lugares)
})

app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto 3000`);
});