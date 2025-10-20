// --- Funciones del dashboard ---

//Extracción de los datos del localStorage (data.js)
const dashboard = document.getElementById("dashboard");
let categoriaSeleccionada = "";
let tipoSeleccionado = "";

// Para ayudar a la busqueda y filtrado quitamos tildes y pasamos a minúsculas
function normalizar(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Preparación de las tarjetas del dashboard
function renderDashboard() {
  dashboard.innerHTML = "";
  let filtrados = voluntariados;
  // Filtrado por categoría y tipo si hay selección
  if (categoriaSeleccionada) {
    filtrados = filtrados.filter(v => normalizar(v.categoria) === categoriaSeleccionada);
  }
  if (tipoSeleccionado) {
    filtrados = filtrados.filter(v => normalizar(v.tipo) === tipoSeleccionado);
  }
  // Recorremos los voluntariados filtrados y creamos las tarjetas
  filtrados.forEach(v => {
    const creador = usuarios.find(u => u.id === v.creadorId)?.nombre || "Desconocido"; // Buscamos el nombre del creador por su ID
    // Normalizamos las clases CSS para categoría y tipo
    const categoriaClass = normalizar(v.categoria);
    const tipoClass = normalizar(v.tipo); // Oferta o Petición
    // Creamos la tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = `tarjeta ${categoriaClass}`;
    
    tarjeta.innerHTML = `
     <span class="tipo-${tipoClass}">${v.tipo}</span>
     <span class="categoria-${categoriaClass}">${v.categoria}</span>
     <h4>${v.titulo}</h4>
     <h6>Creado por: <b>${creador}</b> | Modalidad: <b>${v.modalidad}</b></h6>
     <p>${v.descripcion}</p>
     <small>Publicado: ${v.fecha}</small>
     `;
     // Añadimos la tarjeta al dashboard
    dashboard.appendChild(tarjeta);
  });
}

// Filtro por categoría (Todos, Deportes, Idiomas y Profesiones)
document.querySelectorAll("#filtrosTabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    categoriaSeleccionada = normalizar(btn.getAttribute("data-categoria"));
    document.querySelectorAll("#filtrosTabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderDashboard();
  });
});

// Filtro por tipo (Oferta o Petición)
document.querySelectorAll("#tipoTabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    tipoSeleccionado = normalizar(btn.getAttribute("data-tipo"));
    document.querySelectorAll("#tipoTabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderDashboard();
  });
});

// Creamos las tarjetas al cargar la página
renderDashboard();
