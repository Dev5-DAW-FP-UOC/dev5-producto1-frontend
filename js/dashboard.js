// js/dashboard.js

// ==============================
// Variable globales y selectores
// ==============================

// Arrays/objetos TIPOS y CATEGORIAS definidos en config.js
// Array voluntariados em datos.js

let filtroTipoSeleccionado = "todos";
let filtroCategoriaSeleccionada = "todos";

const contenedorFiltros = document.getElementById("dashboard-filtros");
contenedorFiltros.className = "d-flex justify-content-between align-items-center flex-wrap mb-4";
const contenedorTarjetas = document.getElementById("dashboard-tarjetas");

// ==============================
// Función que recibe un objecto voluntariado y devuelve el nodo de la tarjeta
// ==============================
function crearTarjetaVoluntariado(voluntariado) {
  //Objetos globales TIPOS y CATEGORIAS del config.js
  const datosCategoria = CATEGORIAS[voluntariado.categoria];
  const datosTipo = TIPOS[voluntariado.tipo];

  // Columna responsive de Bootstrap
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";

  // Tarjeta principal
  const card = document.createElement("div");
  card.className = "card volunet-card h-100";

  // Cuerpo de la tarjeta
  const cardBody = document.createElement("div");
  cardBody.className = "card-body pb-2 d-flex flex-column justify-content-between";

  // FILA SUPERIOR: Icono + Tipo (izquierda), Categoría (derecha)
  const filaSuperior = document.createElement("div");
  filaSuperior.className = "d-flex justify-content-between align-items-center mb-2";

  // Contenedor de icono categoría y tipo
  const contenedorCategoriaYtipo = document.createElement("div");
  contenedorCategoriaYtipo.className = "d-flex align-items-center";

  // Icono de categoría
  const iconoCategoria = document.createElement("div");
  iconoCategoria.className = `volunet-icon me-2`;
  iconoCategoria.innerHTML = `<i class="bi ${datosCategoria.icono} fs-4 ${datosCategoria.iconoColorClass}"></i>`;

  // Badge de tipo + icono
  const badgeTipo = document.createElement("span");
  badgeTipo.className = `badge fw-semibold px-2 ${datosTipo.badgeClass}`;
  badgeTipo.innerHTML = `<i class="bi ${datosTipo.icono} fs-6 me-1"></i>${datosTipo.nombre}`;

  // Juntar icono categoría y badge tipo
  contenedorCategoriaYtipo.appendChild(iconoCategoria);
  contenedorCategoriaYtipo.appendChild(badgeTipo);

  // Badge de categoría
  const badgeCategoria = document.createElement("span");
  badgeCategoria.className = `badge ${datosCategoria.badgeClass} fw-semibold px-2 py-1 fs-8`;
  badgeCategoria.textContent = datosCategoria.nombre;

  // Añadir los contenedores a la fila superior
  filaSuperior.appendChild(contenedorCategoriaYtipo);
  filaSuperior.appendChild(badgeCategoria);

  // Título
  const titulo = document.createElement("h5");
  titulo.className = "card-title fw-bold mb-1";
  titulo.textContent = voluntariado.titulo;

  // Autor
  const autor = document.createElement("div");
  autor.className = "mb-2";
  autor.innerHTML = `<strong>${voluntariado.autor}</strong>${voluntariado.modalidad ? " · " + voluntariado.modalidad : ""}`;

  // Descripción
  const descripcion = document.createElement("p");
  descripcion.className = "card-text mb-2 small";
  descripcion.textContent = voluntariado.descripcion;

  // Fila inferior: Botón "Ver detalle" y fecha
  const filaInferior = document.createElement("div");
  filaInferior.className = "d-flex justify-content-between align-items-end";

  // Botón "Ver detalle"
  const btnDetalle = document.createElement("a");
  btnDetalle.href = "#";
  btnDetalle.className = "btn btn-outline-primary btn-sm btn-ver-detalle";
  btnDetalle.textContent = "Ver detalle";
  btnDetalle.addEventListener("click", function (event) {
    event.preventDefault();
    alert(`Ver detalle de: ${voluntariado.titulo}`);
  });

  // Fecha
  const fecha = document.createElement("span");
  fecha.className = "text-secondary ms-2 small align-self-end";
  fecha.textContent = voluntariado.fecha;

  // Añade botón y fecha a la fila inferior
  filaInferior.appendChild(btnDetalle);
  filaInferior.appendChild(fecha);

  // Usuario
  const usuario = document.createElement("div");
  usuario.className = "mt-2 small text-end text-muted";
  usuario.textContent = `@${voluntariado.usuario}`;

  // Monta todo en el cuerpo de la tarjeta
  cardBody.appendChild(filaSuperior);
  cardBody.appendChild(titulo);
  cardBody.appendChild(autor);
  cardBody.appendChild(descripcion);
  cardBody.appendChild(filaInferior);

  // Añadir body a la tarjeta
  card.appendChild(cardBody);

  // Añadir tarjeta a la columna
  col.appendChild(card);

  // Devolver el nodo completo (columna con tarjeta)
  return col;
}

// ==============================
// Función para renderizar TODAS las tarjetas de voluntarios y limpiar contenedor
// ==============================
function renderizarTarjetas(voluntariadosArray) {
  contenedorTarjetas.innerHTML = ""; // Vacía el contenedor antes de renderizar
  if (voluntariadosArray.length === 0) {
    const vacio = document.createElement("div");
    vacio.className = "alert alert-warning";
    vacio.textContent = "No hay voluntariados para los filtros seleccionados.";
    contenedorTarjetas.appendChild(vacio);
    return;
  }
  voluntariadosArray.forEach((vol) => {
    const tarjeta = crearTarjetaVoluntariado(vol);
    contenedorTarjetas.appendChild(tarjeta);
  });
}

// ==============================
// Función para renderizar los filtros de tipo y categoría
// ==============================
function renderizarFiltros() {
  contenedorFiltros.innerHTML = "";

  // Contenedor filtros por tipo
  const contenedorTipos = document.createElement("div");
  contenedorTipos.className = "mb-2";

  // Etiqueta
  const labelTipo = document.createElement("span");
  labelTipo.className = "me-2 fw-bold";
  labelTipo.textContent = "Tipo";
  contenedorTipos.appendChild(labelTipo);

  // Botón "Todos"
  const btnTodosTipo = document.createElement("button");
  btnTodosTipo.className = `btn btn-outline-secondary btn-sm me-2 ${filtroTipoSeleccionado === "todos" ? "active" : ""}`;
  btnTodosTipo.textContent = "Todos";
  btnTodosTipo.addEventListener("click", function () {
    filtroTipoSeleccionado = "todos";
    renderizarFiltros();
    filtrarYRenderizar();
  });
  contenedorTipos.appendChild(btnTodosTipo);

  // Botones para cada tipo
  for (const tipo in TIPOS) {
    const datosTipo = TIPOS[tipo];
    const btn = document.createElement("button");
    btn.className = `btn btn-outline-primary btn-sm me-2 ${filtroTipoSeleccionado === tipo ? "active" : ""} ${datosTipo.badgeClass}`;
    btn.innerHTML = `<i class="bi ${datosTipo.icono} me-1"></i>${datosTipo.nombre}`;
    btn.addEventListener("click", () => {
      filtroTipoSeleccionado = tipo;
      renderizarFiltros();
      filtrarYRenderizar();
    });
    contenedorTipos.appendChild(btn);
  }
  contenedorFiltros.appendChild(contenedorTipos);

  // Contenedor filtros por categoría
  const contenedorCategorias = document.createElement("div");

  // Etiqueta
  const labelCategoria = document.createElement("span");
  labelCategoria.className = "me-2 fw-bold";
  labelCategoria.textContent = "Categoría";
  contenedorCategorias.appendChild(labelCategoria);

  // Botón "Todas"
  const btnTodasCategorias = document.createElement("button");
  btnTodasCategorias.className = `btn btn-outline-secondary btn-sm me-2 ${filtroCategoriaSeleccionada === "todos" ? "active" : ""}`;
  btnTodasCategorias.textContent = "Todas";
  btnTodasCategorias.addEventListener("click", function () {
    filtroCategoriaSeleccionada = "todos";
    renderizarFiltros();
    filtrarYRenderizar();
  });
  contenedorCategorias.appendChild(btnTodasCategorias);

  // Botones para cada categoría
  for (const cat in CATEGORIAS) {
    const datosCat = CATEGORIAS[cat];
    const btn = document.createElement("button");
    btn.className = `btn btn-outline-primary btn-sm me-2${filtroCategoriaSeleccionada === cat ? " active" : ""} ${datosCat.badgeClass}`;
    btn.innerHTML = `<i class="bi ${datosCat.icono} me-1 ${datosCat.iconoColorClass}"></i>${datosCat.nombre}`;
    btn.addEventListener("click", () => {
      filtroCategoriaSeleccionada = cat;
      renderizarFiltros();
      filtrarYRenderizar();
    });
    contenedorCategorias.appendChild(btn);
  }
  contenedorFiltros.appendChild(contenedorCategorias);
}

// ==============================
// Función para filtrar según los filtros activos y renderizar
// ==============================
function filtrarYRenderizar() {
  let resultado = voluntariados;
  if (filtroTipoSeleccionado !== "todos") {
    resultado = resultado.filter((v) => v.tipo === filtroTipoSeleccionado);
  }
  if (filtroCategoriaSeleccionada !== "todos") {
    resultado = resultado.filter((v) => v.categoria === filtroCategoriaSeleccionada);
  }
  renderizarTarjetas(resultado);
}

// ==============================
// Inicialización al cargar la página
// ==============================
renderizarFiltros();
filtrarYRenderizar();
renderizarTarjetas(voluntariados);
