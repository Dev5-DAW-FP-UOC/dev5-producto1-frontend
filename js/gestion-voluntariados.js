// =============================
// gestion-voluntariados.js
// =============================

// ------- 1. Referencias y configuración de modales Bootstrap --------

// Instanciar modales Bootstrap
const modalVoluntariado = new bootstrap.Modal(document.getElementById("modalVoluntariado"));
const modalDetalle = new bootstrap.Modal(document.getElementById("modalDetalleVoluntariado"));
const modalBorrar = new bootstrap.Modal(document.getElementById("modalBorrarVoluntariado"));

// Elementos del formulario de alta/edición
const formVoluntariado = document.getElementById("formVoluntariado");
const inputId = document.getElementById("inputId");
const inputTitulo = document.getElementById("inputTitulo");
const inputAutor = document.getElementById("inputAutor");
const inputModalidad = document.getElementById("inputModalidad");
const inputTipo = document.getElementById("inputTipo");
const inputCategoria = document.getElementById("inputCategoria");
const inputDescripcion = document.getElementById("inputDescripcion");
const inputFecha = document.getElementById("inputFecha");
const modalVoluntariadoLabel = document.getElementById("modalVoluntariadoLabel");

// Botón "Añadir voluntariado"
const btnAgregarVoluntariado = document.getElementById("btnAgregarVoluntariado");

// Elementos de los modales de detalles y borrar
const detalleVoluntariadoBody = document.getElementById("detalleVoluntariadoBody");
const borrarVoluntariadoTitulo = document.getElementById("borrarVoluntariadoTitulo");
const btnConfirmarBorrar = document.getElementById("btnConfirmarBorrar");

// Contenedor principal de tarjetas
const contenedor = document.getElementById("lista-voluntariados");

// ------- 2. Renderizado de tarjetas de voluntariados --------

function renderizarVoluntariados() {
  contenedor.innerHTML = ""; // Limpia el contenedor

  voluntariados.forEach((vol) => {
    // ----- Tarjeta base -----
    const tarjeta = document.createElement("div");
    tarjeta.className = "card volunet-card mb-3 px-2 py-2";

    // ----- Fila principal responsive -----
    const fila = document.createElement("div");
    fila.className = "d-flex flex-row flex-md-row flex-column align-items-start align-items-md-center justify-content-between";

    // 1. Contenedor de iconos de tipo y categoría
    const iconosDiv = document.createElement("div");
    iconosDiv.className = "d-flex align-items-center gap-1";

    const datosTipo = TIPOS[vol.tipo];
    const iconoTipo = document.createElement("span");
    iconoTipo.className = `${datosTipo.iconoColorClass} me-1 fs-5 d-flex align-items-center`;
    iconoTipo.innerHTML = `<i class="bi ${datosTipo.icono}"></i>`;
    iconosDiv.appendChild(iconoTipo);

    const datosCat = CATEGORIAS[vol.categoria];
    const iconoCat = document.createElement("span");
    iconoCat.className = `${datosCat.iconoColorClass} fs-5 d-flex align-items-center`;
    iconoCat.innerHTML = `<i class="bi ${datosCat.icono}"></i>`;
    iconosDiv.appendChild(iconoCat);

    // 2. Contenedor de datos (título, autor, modalidad)
    const datosDiv = document.createElement("div");
    datosDiv.className = "flex-grow-1 min-w-0 px-3 py-1 w-100";

    const titulo = document.createElement("h5");
    titulo.className = "fw-bold mb-1 w-100";
    titulo.textContent = vol.titulo;
    datosDiv.appendChild(titulo);

    const autor = document.createElement("div");
    autor.className = "mb-1 text-secondary small text-truncate";
    autor.innerHTML = `<strong>${vol.autor || "—"}</strong>${vol.modalidad ? " · " + vol.modalidad : ""}`;
    datosDiv.appendChild(autor);

    // 3. Contenedor badges (solo en escritorio)
    const badgesDiv = document.createElement("div");
    badgesDiv.className = "d-none d-md-flex flex-row align-items-center gap-2 flex-shrink-0";

    const badgeTipo = document.createElement("span");
    badgeTipo.className = `badge ${datosTipo.badgeClass} px-2`;
    badgeTipo.textContent = datosTipo.nombre;
    badgesDiv.appendChild(badgeTipo);

    const badgeCategoria = document.createElement("span");
    badgeCategoria.className = `badge ${datosCat.badgeClass} px-2`;
    badgeCategoria.textContent = datosCat.nombre;
    badgesDiv.appendChild(badgeCategoria);

    // 4. Contenedor botones de acción
    const accionesDiv = document.createElement("div");
    accionesDiv.className = "d-flex align-items-center gap-2 flex-shrink-0 ms-md-3 ms-auto mt-2 mt-md-0";

    // Botón Editar
    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-outline-primary btn-sm px-2 py-1";
    btnEditar.title = "Editar";
    btnEditar.innerHTML = '<i class="bi bi-pencil"></i>';
    btnEditar.addEventListener("click", () => abrirModalEdicion(vol.id));
    accionesDiv.appendChild(btnEditar);

    // Botón Eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-outline-danger btn-sm px-2 py-1";
    btnEliminar.title = "Eliminar";
    btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    btnEliminar.addEventListener("click", () => abrirModalBorrar(vol.id));
    accionesDiv.appendChild(btnEliminar);

    // Botón Detalles
    const btnDetalle = document.createElement("button");
    btnDetalle.className = "btn btn-outline-secondary btn-sm px-2 py-1";
    btnDetalle.title = "Detalles";
    btnDetalle.innerHTML = '<i class="bi bi-info-circle"></i>';
    btnDetalle.addEventListener("click", () => abrirModalDetalle(vol.id));
    accionesDiv.appendChild(btnDetalle);

    // Orden final según mockup
    fila.appendChild(iconosDiv);
    fila.appendChild(datosDiv);
    fila.appendChild(badgesDiv);
    fila.appendChild(accionesDiv);

    tarjeta.appendChild(fila);
    contenedor.appendChild(tarjeta);
  });
}

// ------- 3. Gestión de modales: alta, edición, detalles, borrado -------

// Abre el modal para alta (nuevo voluntariado)
btnAgregarVoluntariado.addEventListener("click", () => {
  // Limpia campos
  inputId.value = "";
  inputTitulo.value = "";
  inputAutor.value = "";
  inputModalidad.value = "";
  inputTipo.value = "";
  inputCategoria.value = "";
  inputDescripcion.value = "";
  inputFecha.value = "";
  modalVoluntariadoLabel.textContent = "Añadir voluntariado";
  modalVoluntariado.show();
});

// Abre el modal de edición, cargando datos del voluntariado
function abrirModalEdicion(id) {
  const vol = voluntariados.find((v) => v.id === id);
  if (!vol) return;
  inputId.value = vol.id;
  inputTitulo.value = vol.titulo;
  inputAutor.value = vol.autor || "";
  inputModalidad.value = vol.modalidad || "";
  inputTipo.value = vol.tipo || "";
  inputCategoria.value = vol.categoria || "";
  inputDescripcion.value = vol.descripcion || "";
  inputFecha.value = vol.fecha || "";
  modalVoluntariadoLabel.textContent = "Editar voluntariado";
  modalVoluntariado.show();
}

// Guardar alta o edición
formVoluntariado.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = inputId.value;
  const nuevoVol = {
    id: id ? Number(id) : Date.now(),
    titulo: inputTitulo.value.trim(),
    autor: inputAutor.value.trim(),
    modalidad: inputModalidad.value.trim(),
    tipo: inputTipo.value,
    categoria: inputCategoria.value,
    descripcion: inputDescripcion.value.trim(),
    fecha: inputFecha.value,
  };

  if (id) {
    // Editar existente
    const idx = voluntariados.findIndex((v) => v.id === Number(id));
    if (idx !== -1) voluntariados[idx] = nuevoVol;
  } else {
    // Alta: añade nuevo
    voluntariados.push(nuevoVol);
  }

  modalVoluntariado.hide();
  renderizarVoluntariados();
});

// Abre el modal de detalles (solo lectura)
function abrirModalDetalle(id) {
  const vol = voluntariados.find((v) => v.id === id);
  if (!vol) return;
  detalleVoluntariadoBody.innerHTML = `
    <h5 class="fw-bold">${vol.titulo}</h5>
    <div><b>Autor:</b> ${vol.autor}</div>
    <div><b>Modalidad:</b> ${vol.modalidad}</div>
    <div><b>Tipo:</b> ${TIPOS[vol.tipo]?.nombre || ""}</div>
    <div><b>Categoría:</b> ${CATEGORIAS[vol.categoria]?.nombre || ""}</div>
    <div><b>Fecha:</b> ${vol.fecha || ""}</div>
    <div class="mt-2">${vol.descripcion}</div>
  `;
  modalDetalle.show();
}

// Abre el modal de confirmación de borrado
function abrirModalBorrar(id) {
  const vol = voluntariados.find((v) => v.id === id);
  if (!vol) return;
  borrarVoluntariadoTitulo.textContent = vol.titulo;
  btnConfirmarBorrar.dataset.id = id;
  modalBorrar.show();
}

// Confirmar borrado
btnConfirmarBorrar.addEventListener("click", () => {
  const id = Number(btnConfirmarBorrar.dataset.id);
  const idx = voluntariados.findIndex((v) => v.id === id);
  if (idx !== -1) voluntariados.splice(idx, 1);
  modalBorrar.hide();
  renderizarVoluntariados();
});

// Inicializa la vista al cargar la página
renderizarVoluntariados();
