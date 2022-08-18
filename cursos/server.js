const express = require('express');

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

app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto 3000`);
});