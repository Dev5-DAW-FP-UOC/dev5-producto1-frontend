// js/gestión-usuarios.js

// =============================
// Referencias a elementos del DOM
// =============================
const listaUsuarios = document.getElementById("lista-usuarios");
const btnAgregarUsuario = document.getElementById("btnAgregarUsuario");
const modalUsuario = new bootstrap.Modal(document.getElementById("modalUsuario"));
const formUsuario = document.getElementById("formUsuario");
const inputIdUsuario = document.getElementById("inputIdUsuario");
const inputNombre = document.getElementById("inputNombre");
const inputEmail = document.getElementById("inputEmail");
const inputRol = document.getElementById("inputRol");
const inputPassword = document.getElementById("inputPassword");
const inputPassword2 = document.getElementById("inputPassword2");
const modalBorrarUsuario = new bootstrap.Modal(document.getElementById("modalBorrarUsuario"));
const btnConfirmarBorrar = document.getElementById("btnConfirmarBorrar");

// Variable temporal para borrar
let usuarioABorrar = null;

// =============================
// Renderizado de tarjetas de usuarios
// =============================
function renderizarUsuarios() {
  listaUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    listaUsuarios.appendChild(crearTarjetaUsuario(usuario));
  });
}

// =============================
// Crea una tarjeta de usuario solo con nodos
// =============================
function crearTarjetaUsuario(usuario) {
  // Tarjeta principal
  const card = document.createElement("div");
  card.className = "usuario-card card mb-3 shadow-sm";

  // Card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between";

  // Info usuario (nombre, email, badge)
  const usuarioInfo = document.createElement("div");
  usuarioInfo.className = "usuario-info";

  // Nombre
  const nombre = document.createElement("h5");
  nombre.className = "card-title mb-1 fw-bold";
  nombre.textContent = usuario.nombre;
  usuarioInfo.appendChild(nombre);

  // Email
  const email = document.createElement("p");
  email.className = "card-text text-muted mb-0";
  email.textContent = usuario.email;
  usuarioInfo.appendChild(email);

  // Badge de rol DEBAJO del email
  const badge = document.createElement("span");
  let badgeClass = "badge ";
  let badgeText = "";
  // Asegura que el rol se compara en minúscula (previene errores de formato)
  switch ((usuario.rol || "").toLowerCase()) {
    case "administrador":
      badgeClass += "badge-admin";
      badgeText = "Administrador";
      break;
    case "voluntario":
    default:
      badgeClass += "badge-voluntario";
      badgeText = "Voluntario";
      break;
  }
  badge.className = badgeClass;
  badge.textContent = badgeText;
  badge.style.marginTop = "0.55rem";
  usuarioInfo.appendChild(badge);

  // Acciones (botones)
  const acciones = document.createElement("div");
  acciones.className = "usuario-acciones d-flex flex-row align-items-center mt-2 mt-md-0";

  // Botón editar
  const btnEditar = document.createElement("button");
  btnEditar.className = "btn btn-outline-primary btn-sm me-1";
  btnEditar.title = "Editar usuario";
  btnEditar.innerHTML = '<i class="bi bi-pencil"></i>';
  btnEditar.addEventListener("click", () => abrirModalEditar(usuario));
  acciones.appendChild(btnEditar);

  // Botón borrar
  const btnBorrar = document.createElement("button");
  btnBorrar.className = "btn btn-outline-danger btn-sm";
  btnBorrar.title = "Borrar usuario";
  btnBorrar.innerHTML = '<i class="bi bi-trash"></i>';
  btnBorrar.addEventListener("click", () => abrirModalBorrar(usuario));
  acciones.appendChild(btnBorrar);

  // Ensamblar tarjeta
  cardBody.appendChild(usuarioInfo);
  cardBody.appendChild(acciones);
  card.appendChild(cardBody);

  return card;
}

// =============================
// Lógica de modales: alta, edición y borrado
// =============================

// Abrir modal de alta (nuevo usuario)
btnAgregarUsuario.addEventListener("click", () => {
  limpiarModal();
  document.getElementById("modalUsuarioLabel").textContent = "Añadir usuario";
  modalUsuario.show();
});

// Limpiar campos del modal
function limpiarModal() {
  formUsuario.reset();
  inputIdUsuario.value = "";
  inputNombre.value = "";
  inputEmail.value = "";
  inputRol.value = "";
  inputPassword.value = "";
  inputPassword2.value = "";
  formUsuario.classList.remove("was-validated");
}

// Abrir modal de edición
function abrirModalEditar(usuario) {
  limpiarModal();
  document.getElementById("modalUsuarioLabel").textContent = "Editar usuario";
  inputIdUsuario.value = usuario.id;
  inputNombre.value = usuario.nombre;
  inputEmail.value = usuario.email;
  inputRol.value = usuario.rol;
  inputPassword.value = "";
  inputPassword2.value = "";
  modalUsuario.show();
}

// Abrir modal de borrado
function abrirModalBorrar(usuario) {
  usuarioABorrar = usuario;
  modalBorrarUsuario.show();
}

// Borrar usuario
btnConfirmarBorrar.addEventListener("click", () => {
  if (usuarioABorrar) {
    const idx = usuarios.findIndex((u) => u.id === usuarioABorrar.id);
    if (idx !== -1) usuarios.splice(idx, 1);
    renderizarUsuarios();
    modalBorrarUsuario.hide();
    usuarioABorrar = null;
  }
});

// =============================
// Lógica de validación y guardado
// =============================
formUsuario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validación Bootstrap
  if (!formUsuario.checkValidity()) {
    formUsuario.classList.add("was-validated");
    return;
  }

  // Validar contraseñas iguales
  if (inputPassword.value !== inputPassword2.value) {
    inputPassword2.setCustomValidity("Las contraseñas no coinciden");
    inputPassword2.reportValidity();
    return;
  } else {
    inputPassword2.setCustomValidity("");
  }

  const id = inputIdUsuario.value ? Number(inputIdUsuario.value) : null;

  if (id) {
    // Editar usuario existente
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) {
      usuario.nombre = inputNombre.value;
      usuario.email = inputEmail.value;
      usuario.rol = inputRol.value;
      // Solo cambiar contraseña si se introduce
      if (inputPassword.value) usuario.password = inputPassword.value;
    }
  } else {
    // Crear usuario nuevo
    const nuevoUsuario = {
      id: usuarios.length ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1,
      nombre: inputNombre.value,
      email: inputEmail.value,
      rol: inputRol.value,
      password: inputPassword.value,
    };
    usuarios.push(nuevoUsuario);
  }

  renderizarUsuarios();
  modalUsuario.hide();
  limpiarModal();
  formUsuario.classList.remove("was-validated");
});

// =============================
// Inicializar al cargar la página
// =============================
renderizarUsuarios();
