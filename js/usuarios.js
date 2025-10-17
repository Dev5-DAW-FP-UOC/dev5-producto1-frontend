let editandoUsuarioId = null;

function renderUsuarios() {
  const cont = document.getElementById('listadoUsuarios');
  cont.innerHTML = "";

  window.usuarios.forEach(u => {
    const rolBadgeClass = u.rol === 'administrador' ? 'bg-primary' : 'bg-secondary';
    const rolLabel = u.rol.charAt(0).toUpperCase() + u.rol.slice(1);

    cont.innerHTML += `
      <div class="card mb-3">
        <div class="card-body p-3">
          <!-- VERSIÓN MÓVIL -->
          <div class="d-flex d-md-none flex-column">
            <div class="fw-semibold fs-5 mb-1">${u.nombre}</div>
            <div class="text-muted small mb-2">${u.email}</div>
            <div class="d-flex justify-content-between align-items-center gap-2 mt-2">
              <span class="badge ${rolBadgeClass}">${rolLabel}</span>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" onclick="editarUsuario(${u.id})" title="Editar"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="borrarUsuario(${u.id})" title="Borrar"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
          <!-- VERSIÓN ESCRITORIO -->
          <div class="d-none d-md-flex align-items-center gap-3">
            <div class="flex-grow-1">
              <div class="fw-semibold fs-5 mb-1">${u.nombre}</div>
              <div class="text-muted small">${u.email}</div>
            </div>
            <span class="badge ${rolBadgeClass}">${rolLabel}</span>
            <button class="btn btn-sm btn-outline-primary ms-1" onclick="editarUsuario(${u.id})" title="Editar"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger ms-1" onclick="borrarUsuario(${u.id})" title="Borrar"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    `;
  });
}



// BORRAR
function borrarUsuario(id) {
  if (confirm('¿Seguro que quieres borrar este usuario?')) {
    window.usuarios = window.usuarios.filter(u => Number(u.id) !== Number(id));
    renderUsuarios();
  }
}

// MOSTRAR MODAL DE ALTA
document.getElementById('btnNuevoUsuario').addEventListener('click', function() {
  editandoUsuarioId = null;
  document.getElementById('modalUsuarioLabel').textContent = "Nuevo usuario";
  document.getElementById('formUsuario').reset();
  document.getElementById('usuarioId').value = "";
  document.getElementById('passwordUsuario').required = true;
  const modal = new bootstrap.Modal(document.getElementById('modalUsuario'));
  modal.show();
});

// EDITAR USUARIO
function editarUsuario(id) {
  const u = window.usuarios.find(x => Number(x.id) === Number(id));
  if (!u) return;
  editandoUsuarioId = Number(id);
  document.getElementById('modalUsuarioLabel').textContent = "Editar usuario";
  document.getElementById('usuarioId').value = u.id;
  document.getElementById('nombreUsuario').value = u.nombre;
  document.getElementById('emailUsuario').value = u.email;
  document.getElementById('passwordUsuario').value = "";
  document.getElementById('passwordUsuario').required = false; // No es obligatorio editar la contraseña
  document.getElementById('rolUsuario').value = u.rol;
  const modal = new bootstrap.Modal(document.getElementById('modalUsuario'));
  modal.show();
}

// GUARDAR USUARIO
document.getElementById('formUsuario').addEventListener('submit', function(e) {
  e.preventDefault();
  const passwordInput = document.getElementById('passwordUsuario').value;

  if (editandoUsuarioId) {
    const idx = window.usuarios.findIndex(x => Number(x.id) === Number(editandoUsuarioId));
    const prev = window.usuarios[idx];
    const u = {
      id: Number(editandoUsuarioId),
      nombre: document.getElementById('nombreUsuario').value.trim(),
      email: document.getElementById('emailUsuario').value.trim(),
      password: passwordInput !== "" ? passwordInput : prev.password,
      rol: document.getElementById('rolUsuario').value
    };
    window.usuarios[idx] = u;
  } else {
    // Alta: contraseña obligatoria
    const u = {
      id: Date.now(),
      nombre: document.getElementById('nombreUsuario').value.trim(),
      email: document.getElementById('emailUsuario').value.trim(),
      password: passwordInput,
      rol: document.getElementById('rolUsuario').value
    };
    window.usuarios.push(u);
  }

  bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide();
  renderUsuarios();
  editandoUsuarioId = null;
});

// INIT
window.addEventListener('DOMContentLoaded', renderUsuarios);
