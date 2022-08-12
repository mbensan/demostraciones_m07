const lista_lugares = document.querySelector('#lista-lugares')

function dibujarLugares(lugares) {
  // 1. Vamos armando el HTML interno de la lista, de a poco
  let html = ''
  for (let lugar of lugares) {
    html += `<li class="list-group-item">${lugar.nombre} (${lugar.lat}, ${lugar.long})</li>`
  }
  // 2. Fijar el HTML interno de la lista
  lista_lugares.innerHTML = html;
}

async function traerLugares () {
  // 1. Me traigo el array de lugares, desde la API de server.js
  let lugares = await fetch('/lugares')
  lugares = await lugares.json()

  // 2. Armo el texto del HTML que debe tener la lista de lugares
  dibujarLugares(lugares)

  //console.log(lugares);
}
traerLugares()
