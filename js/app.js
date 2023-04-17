console.log(autos);


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
  datosBusqueda.minimo = e.target.value;
});

maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = e.target.value;
});

puertas.addEventListener('change', (e) => {
  datosBusqueda.puertas = e.target.value;
});

transmision.addEventListener('change', (e) => {
  datosBusqueda.transmision = e.target.value;
});

color.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value;
  console.log(datosBusqueda);
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
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear);
  console.log(resultado);

  mostrarAutos(resultado);
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