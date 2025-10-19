// ========================
// gestión-voluntariados.js
// ========================

// Selecciona el contenedor donde se mostrarán las tarjetas
const contenedor = document.getElementById("lista-voluntariados");

// Renderiza todas las tarjetas de voluntariados
function renderizarVoluntariados() {
  contenedor.innerHTML = ""; // Limpia el contenedor

  voluntariados.forEach((vol) => {
    // ----- Tarjeta base -----
    const tarjeta = document.createElement("div");
    tarjeta.className = "card volunet-card mb-3 px-2 py-2";

    // ----- Fila principal -----
    // Desktop: flex-row; Mobile: flex-column
    const fila = document.createElement("div");
    fila.className = "d-flex flex-row flex-md-row flex-column align-items-start align-items-md-center justify-content-between";
    // ========== 1. Contenedor iconos (tipo + categoría) =============
    const iconosDiv = document.createElement("div");
    iconosDiv.className = "d-flex align-items-center gap-1";

    // Icono de tipo (usa config para clase de color e icono)
    const datosTipo = TIPOS[vol.tipo];
    const iconoTipo = document.createElement("span");
    iconoTipo.className = `${datosTipo.iconoColorClass} me-1 fs-5 d-flex align-items-center`;
    iconoTipo.innerHTML = `<i class="bi ${datosTipo.icono}"></i>`;
    iconosDiv.appendChild(iconoTipo);

    // Icono de categoría (usa config)
    const datosCat = CATEGORIAS[vol.categoria];
    const iconoCat = document.createElement("span");
    iconoCat.className = `${datosCat.iconoColorClass} fs-5 d-flex align-items-center`;
    iconoCat.innerHTML = `<i class="bi ${datosCat.icono}"></i>`;
    iconosDiv.appendChild(iconoCat);

    // ========== 2. Contenedor datos (título, usuario, modalidad) =============
    const datosDiv = document.createElement("div");
    datosDiv.className = "flex-grow-1 min-w-0 px-3 py-1 w-100";

    // Título (negrita)
    const titulo = document.createElement("h5");
    titulo.className = "fw-bold mb-1 w-100";
    titulo.textContent = vol.titulo;
    datosDiv.appendChild(titulo);

    // Usuario y modalidad
    const usuario = document.createElement("div");
    usuario.className = "mb-1 text-secondary small text-truncate";
    // Intenta acceder a vol.usuario (puede ser autor, depende del array)
    usuario.innerHTML = `<strong>${vol.usuario || vol.autor || "—"}</strong>${vol.modalidad ? " · " + vol.modalidad : ""}`;
    datosDiv.appendChild(usuario);

    // ========== 3. Contenedor badges (solo visible en desktop) =============
    const badgesDiv = document.createElement("div");
    badgesDiv.className = "d-none d-md-flex flex-row align-items-center gap-2 flex-shrink-0";

    // Badge tipo (clase desde config, color desde CSS)
    const badgeTipo = document.createElement("span");
    badgeTipo.className = `badge ${datosTipo.badgeClass} px-2`;
    badgeTipo.textContent = datosTipo.nombre;
    badgesDiv.appendChild(badgeTipo);

    // Badge categoría (clase desde config)
    const badgeCategoria = document.createElement("span");
    badgeCategoria.className = `badge ${datosCat.badgeClass} px-2`;
    badgeCategoria.textContent = datosCat.nombre;
    badgesDiv.appendChild(badgeCategoria);

    // ========== 4. Contenedor botones de acción =============
    const accionesDiv = document.createElement("div");
    // Mobile: ms-auto mt-2; Desktop: ms-md-3 mt-md-0
    accionesDiv.className = "d-flex align-items-center gap-2 flex-shrink-0 ms-md-3 ms-auto mt-2 mt-md-0";

    // Botón Editar
    const btnEditar = document.createElement("button");
    btnEditar.className = "btn btn-outline-primary btn-sm px-2 py-1";
    btnEditar.title = "Editar";
    btnEditar.innerHTML = '<i class="bi bi-pencil"></i>';
    btnEditar.addEventListener("click", () => {
      // Aquí irá la lógica de edición (modal, etc.)
      alert(`Editar: ${vol.titulo}`);
    });
    accionesDiv.appendChild(btnEditar);

    // Botón Eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-outline-danger btn-sm px-2 py-1";
    btnEliminar.title = "Eliminar";
    btnEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    btnEliminar.addEventListener("click", () => {
      // Aquí irá la lógica de eliminación (modal de confirmación, etc.)
      alert(`Eliminar: ${vol.titulo}`);
    });
    accionesDiv.appendChild(btnEliminar);

    // Botón Detalles
    const btnDetalle = document.createElement("button");
    btnDetalle.className = "btn btn-outline-secondary btn-sm px-2 py-1";
    btnDetalle.title = "Detalles";
    btnDetalle.innerHTML = '<i class="bi bi-info-circle"></i>';
    btnDetalle.addEventListener("click", () => {
      // Aquí irá la lógica de mostrar detalles
      alert(`Detalle: ${vol.titulo}`);
    });
    accionesDiv.appendChild(btnDetalle);

    // ======== MONTA LA TARJETA EN ORDEN SEGÚN MOCKUP ========
    // Desktop: [iconos][datos][badges][botones]
    // Mobile: [iconos arriba][datos debajo][badges ocultos][botones derecha abajo]
    fila.appendChild(iconosDiv);
    fila.appendChild(datosDiv);
    fila.appendChild(badgesDiv);
    fila.appendChild(accionesDiv);

    tarjeta.appendChild(fila);
    contenedor.appendChild(tarjeta);
  });
}

// Inicializa el render al cargar la página
renderizarVoluntariados();
