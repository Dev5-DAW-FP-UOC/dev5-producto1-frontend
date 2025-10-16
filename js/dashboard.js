const ICONOS_CATEGORIA = {
  idiomas:    { icon: "bi-book", color: "icon-idiomas", badge: "idiomas" },
  deportes:   { icon: "bi-trophy", color: "icon-deportes", badge: "deportes" },
  profesiones:{ icon: "bi-briefcase", color: "icon-profesiones", badge: "profesiones" }
};

const ICONOS_TIPO = {
  oferta:    { icon: "bi-arrow-up-right-circle", color: "icon-oferta", badge: "oferta" },
  peticion:  { icon: "bi-arrow-down-left-circle", color: "icon-peticion", badge: "peticion" }
};

const ETIQUETAS_CATEGORIA = {
  idiomas:      "Idiomas",
  deportes:     "Deportes",
  profesiones:  "Profesiones"
};

const ETIQUETAS_TIPO = {
  oferta:    "Oferta",
  peticion:  "Petición"
};

let tipoActual = "todos";
let catActual = "todas";

function renderVoluntariados() {
  const container = document.getElementById('voluntariadosLista');
  container.innerHTML = "";

  let data = voluntariados
    .filter(v => tipoActual === "todos" || v.tipo === tipoActual)
    .filter(v => catActual === "todas" || v.categoria === catActual);

  if (data.length === 0) {
    container.innerHTML = `<div class="col-12 text-center text-muted py-5">No hay voluntariados para esta selección.</div>`;
    return;
  }

  data.forEach(v => {
    const iconCat = ICONOS_CATEGORIA[v.categoria];
    const iconTipo = ICONOS_TIPO[v.tipo];

    container.innerHTML += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm border">
          <div class="card-body">
            <div class="d-flex align-items-center mb-2">
              <i class="bi ${iconCat.icon} ${iconCat.color} fs-4 me-2" aria-label="${ETIQUETAS_CATEGORIA[v.categoria]}"></i>
              <span class="badge ${iconTipo.badge} me-2 ms-1" style="font-size: 1em;">
                <i class="bi ${iconTipo.icon} icono-badge me-1"></i>${ETIQUETAS_TIPO[v.tipo]}
              </span>
              <span class="badge ${iconCat.badge} ms-auto" style="font-size: 1em;">${ETIQUETAS_CATEGORIA[v.categoria]}</span>
            </div>
            <div class="fw-bold mb-1">${v.titulo}</div>
            <div class="mb-1"><span class="fw-semibold">${v.autor}</span> · ${v.modalidad}</div>
            <div class="text-muted small mb-2">${v.descripcion}</div>
            <button class="btn btn-outline-primary btn-sm" aria-label="Ver detalle de ${v.titulo}">Ver detalle</button>
            <span class="float-end text-secondary small">${formateaFecha(v.fecha)}</span>
          </div>
        </div>
      </div>
    `;
  });
}

document.querySelectorAll('.filtro-tipo').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filtro-tipo').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    tipoActual = this.dataset.tipo;
    renderVoluntariados();
  });
});
document.querySelectorAll('.filtro-cat').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filtro-cat').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    catActual = this.dataset.cat;
    renderVoluntariados();
  });
});

function formateaFecha(fechaISO) {
  const d = new Date(fechaISO);
  return d.toLocaleDateString("es-ES");
}

window.addEventListener('DOMContentLoaded', renderVoluntariados);
