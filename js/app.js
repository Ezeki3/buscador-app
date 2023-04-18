
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

// Usamos solo un rango de no mas de 10 años
const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: ''
}
// EVENTOS
document.addEventListener('DOMContentLoaded', () => {

  mostrarAutos(autos);//Muestra los autos al cargar

  llenarSelect();
});

marca.addEventListener('change', (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

year.addEventListener('change', (e) => {
  // Pasamos el valor de tipo string a un valor entero para usarlo en su respectiva funcion
  datosBusqueda.year = parseInt(e.target.value);

  filtrarAuto();
});

minimo.addEventListener('change', (e) => {
  datosBusqueda.minimo = parseInt(e.target.value);

  filtrarAuto();
});

maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = e.target.value;

  filtrarAuto();
});

puertas.addEventListener('change', (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);

  filtrarAuto();
});

transmision.addEventListener('change', (e) => {
  datosBusqueda.transmision = e.target.value;

  filtrarAuto();
});

color.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value;

  filtrarAuto();
})

// Funciones
function mostrarAutos(autos) {

  // Limpiamos el HTML previo en caso de que exista
  limpiarHTML();

  autos.forEach(auto => {

    const { marca, modelo, year, puertas, transmision, precio, color } = auto;

    autoHTML = document.createElement('P');
    autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
    `

    resultado.appendChild(autoHTML)
  });
}

function limpiarHTML() {
  // vamos a limpiar el contenido en caso de que exista antes de que mostremos nuevo contenido
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Generar los años que queremos mostrar en el select de year
function llenarSelect() {

  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos.filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta', 'error', 'rounded-lg');
  noResultado.textContent = 'No hay ningun resultado, intenta con otras opciones de busqueda';
  resultado.appendChild(noResultado)
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}