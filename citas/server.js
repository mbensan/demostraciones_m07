const express = require('express');
const { nuevaCita, mostrarCitas, eliminarCita, editarCita }
 = require('./db.js')
const app = express()

app.use(express.static('public')) // para manejo de archivos estáticos
app.use(express.urlencoded()) // para recibir datos de formulario POST

app.post('/citas', async (req, res) => {
  await nuevaCita(req.body.nombre, req.body.cita)
  res.redirect('/')
})

app.post('/citas/editar', async (req, res) => {
  console.log(req.body);
  await editarCita(req.body.id, req.body.nombre, req.body.cita)
  res.redirect('/')
})

app.get('/citas/eliminar', async (req, res) => {
  console.log(req.query);
  await eliminarCita(req.query.id)
  res.redirect('/')
})

app.get('/citas', async (req, res) => {
  const citas = await mostrarCitas()
  res.json(citas)
})


app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto 3000`);
});