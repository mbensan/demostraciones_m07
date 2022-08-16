const express = require('express');

const app = express()

app.use(express.static('public')) // para manejo de archivos estáticos
app.use(express.urlencoded()) // para recibir datos de formulario POST



app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto 3000`);
});