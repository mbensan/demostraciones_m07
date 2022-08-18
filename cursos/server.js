const express = require('express');
const { Curso, Estudiante } = require('./models.js')

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

app.post('/cursos', async (req, res) => {
  const nombre = req.body.nombre
  const horario = req.body.horario

  await Curso.create({
    nombre, horario
  })

  res.redirect('/')
})

app.get('/cursos', async (req, res) => {
  const cursos = await Curso.findAll({
    include: [{
      model: Estudiante
    }]
  })

  res.json({cursos})
})

app.post('/cursos/alumnos', async (req, res) => {
  const curso_id = req.body.curso_id
  const nombre_estudiante = req.body.nombre_estudiante

  const curso = await Curso.findByPk(curso_id)
  await curso.createEstudiante({
    nombre: nombre_estudiante
  })

  console.log(curso);
  res.redirect('/')
})

app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('Ruta no implementada')
})

app.listen(3000, () => {
  console.log(`Servidor en puerto 3000`);
});