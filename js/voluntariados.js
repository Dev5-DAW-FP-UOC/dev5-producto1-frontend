// js/voluntariados.js

let editandoId = null; // null para alta, id para editar

function renderVoluntariados() {
  const cont = document.getElementById('listadoVoluntariados');
  cont.innerHTML = "";

  window.voluntariados.forEach(v => {
    const iconTipo =
      v.tipo === "oferta" ? "bi-arrow-up-right-circle icon-oferta"
      : "bi-arrow-down-left-circle icon-peticion";
    const labelTipo = v.tipo.charAt(0).toUpperCase() + v.tipo.slice(1);

    const iconCategoria =
      v.categoria === "idiomas" ? "bi-book icon-idiomas"
      : v.categoria === "deportes" ? "bi-trophy icon-deportes"
      : "bi-briefcase icon-profesiones";
    const labelCategoria = v.categoria.charAt(0).toUpperCase() + v.categoria.slice(1);

    cont.innerHTML += `
      <div class="vol-item card mb-3">
        <div class="card-body p-3">
          <!-- VISTA MÓVIL -->
          <div class="d-flex d-md-none flex-column">
            <div class="d-flex align-items-center gap-2 mb-2">
              <i class="bi ${iconTipo} fs-5"></i>
              <i class="bi ${iconCategoria} fs-4"></i>
            </div>
            <div class="fw-semibold fs-5 mb-1">${v.titulo}</div>
            <div class="text-muted small mb-2">${v.autor} · ${v.modalidad}</div>
            <div class="d-flex justify-content-end gap-2 mt-2">
              <button class="btn btn-sm btn-outline-primary" onclick="editarVoluntariado(${v.id})" title="Editar"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" onclick="borrarVoluntariado(${v.id})" title="Borrar"><i class="bi bi-trash"></i></button>
              <button class="btn btn-sm btn-outline-secondary" onclick="verDetalle(${v.id})" title="Ver detalle"><i class="bi bi-info-circle"></i></button>
            </div>
          </div>
          <!-- VISTA ESCRITORIO -->
          <div class="d-none d-md-flex align-items-center gap-3">
            <i class="bi ${iconTipo} fs-5"></i>
            <i class="bi ${iconCategoria} fs-4"></i>
            <div class="flex-grow-1">
              <div class="fw-semibold fs-5 mb-1">${v.titulo}</div>
              <div class="text-muted small">${v.autor} · ${v.modalidad}</div>
            </div>
            <span class="badge ${v.tipo}">${labelTipo}</span>
            <span class="badge ${v.categoria}">${labelCategoria}</span>
            <button class="btn btn-sm btn-outline-primary ms-1" onclick="editarVoluntariado(${v.id})" title="Editar"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger ms-1" onclick="borrarVoluntariado(${v.id})" title="Borrar"><i class="bi bi-trash"></i></button>
            <button class="btn btn-sm btn-outline-secondary ms-1" onclick="verDetalle(${v.id})" title="Ver detalle"><i class="bi bi-info-circle"></i></button>
          </div>
        </div>
      </div>
    `;
  });
}

// =============== BORRADO ===============
function borrarVoluntariado(id) {
  if (confirm('¿Seguro que quieres borrar este voluntariado?')) {
    window.voluntariados = window.voluntariados.filter(v => Number(v.id) !== Number(id));
    renderVoluntariados();
  }
}

// =============== DETALLE ===============
function verDetalle(id) {
  const v = window.voluntariados.find(x => Number(x.id) === Number(id));
  if (!v) return;
  let html = `
    <p><strong>Título:</strong> ${v.titulo}</p>
    <p><strong>Categoría:</strong> ${v.categoria.charAt(0).toUpperCase() + v.categoria.slice(1)}</p>
    <p><strong>Tipo:</strong> ${v.tipo.charAt(0).toUpperCase() + v.tipo.slice(1)}</p>
    <p><strong>Autor:</strong> ${v.autor}</p>
    <p><strong>Modalidad:</strong> ${v.modalidad}</p>
    <p><strong>Descripción:</strong> ${v.descripcion}</p>
    <p><strong>Fecha:</strong> ${formateaFecha(v.fecha)}</p>
  `;
  document.getElementById('detalleContenido').innerHTML = html;
  const modal = new bootstrap.Modal(document.getElementById('modalDetalle'));
  modal.show();
}

// =============== EDITAR/ALTA ===============
document.getElementById('btnNuevo').addEventListener('click', function() {
  editandoId = null;
  document.getElementById('modalLabel').textContent = "Nuevo voluntariado";
  document.getElementById('formVoluntariado').reset();
  document.getElementById('voluntariadoId').value = "";
  const modal = new bootstrap.Modal(document.getElementById('modalVoluntariado'));
  modal.show();
});

function editarVoluntariado(id) {
  const v = window.voluntariados.find(x => Number(x.id) === Number(id));
  if (!v) return;
  editandoId = Number(id);
  document.getElementById('modalLabel').textContent = "Editar voluntariado";
  document.getElementById('voluntariadoId').value = v.id;
  document.getElementById('categoria').value = v.categoria;
  document.getElementById('tipo').value = v.tipo;
  document.getElementById('titulo').value = v.titulo;
  document.getElementById('autor').value = v.autor;
  document.getElementById('modalidad').value = v.modalidad;
  document.getElementById('descripcion').value = v.descripcion;
  document.getElementById('fecha').value = v.fecha;
  const modal = new bootstrap.Modal(document.getElementById('modalVoluntariado'));
  modal.show();
}

document.getElementById('formVoluntariado').addEventListener('submit', function(e) {
  e.preventDefault();
  const v = {
    id: editandoId ? Number(editandoId) : Date.now(),
    categoria: document.getElementById('categoria').value,
    tipo: document.getElementById('tipo').value,
    titulo: document.getElementById('titulo').value.trim(),
    autor: document.getElementById('autor').value.trim(),
    modalidad: document.getElementById('modalidad').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    fecha: document.getElementById('fecha').value
  };

  if (editandoId) {
    const idx = window.voluntariados.findIndex(x => Number(x.id) === Number(editandoId));
    if (idx !== -1) window.voluntariados[idx] = v;
  } else {
    window.voluntariados.push(v);
  }

  bootstrap.Modal.getInstance(document.getElementById('modalVoluntariado')).hide();
  renderVoluntariados();
  editandoId = null;
});

// =============== UTILS ===============
function formateaFecha(fechaISO) {
  const d = new Date(fechaISO);
  return d.toLocaleDateString("es-ES");
}

// =============== INIT ===============
window.addEventListener('DOMContentLoaded', renderVoluntariados);
