const lista_citas = document.querySelector('#lista-citas');

let citas;

function dibujarCitas(citas) {
  let html_citas = ''
  for (let cita of citas) {
    html_citas += `
      <li class="list-group-item">
        <div class="row">
          <div class="col-8">
            <h5>${cita.cita}</h5>
            <pre>${cita.nombre}</pre>
          </div>
          <div class="col-4">
            <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="llenarModalEdicion(${cita.id})">
              <i class="fa-solid fa-pencil text-warning"></i>
            </a>
            <a href="/citas/eliminar?id=${cita.id}" class="btn">
              <i class="fa-solid fa-trash text-danger"></i>
            </a>
          </div>
        </div>
      </li>
    `
    lista_citas.innerHTML = html_citas
  }
}

async function traerCitas () {
  const resp = await fetch('/citas')
  citas = await resp.json()

  dibujarCitas(citas)
}
traerCitas()

// estas 3 variables son los campos input del formulario de edición
const editar_nombre = document.querySelector('#editar_nombre')
const editar_cita = document.querySelector('#editar_cita')
const editar_id = document.querySelector('#editar_id')

function llenarModalEdicion(id) {
  const cita = citas.find(ci => ci.id == id)
  
  editar_nombre.value = cita.nombre
  editar_cita.value = cita.cita
  editar_id.value = cita.id
}
