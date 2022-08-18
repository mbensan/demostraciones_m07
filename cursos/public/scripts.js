const select_cursos = document.querySelector('#curso_id')
const lista_cursos = document.querySelector('#cursos')

async function cargar_datos () {
  // 1. Pedimos los cursos a la API
  let datos = await fetch('/cursos')
  datos = await datos.json()

  // 2. Llenamos el Select
  escribir_dom(datos.cursos)
}

function escribir_dom (cursos) {
  console.log(cursos);
  let html_select = ''
  for (let curso of cursos) {
    html_select += `<option value="${curso.id}">${curso.nombre}</option>`
  }
  select_cursos.innerHTML = html_select

  let html_lista = ''
  for (let curso of cursos){
    let html_curso = `
    <ul class="list-group" id="cursos">
      <li class="list-group-item">
        ${curso.nombre}
        <ul>
    `
    for (let estudiante of curso.estudiantes) {
      html_curso += `<li>${estudiante.nombre}</li>`
    }
    html_curso += `
        </ul>
      </li>
    </ul>
    `
    html_lista += html_curso
  }
  lista_cursos.innerHTML = html_lista
}
cargar_datos()