// --- Funciones del usuarios ---

// Cargamos los datos del localStorage
cargarDatos(); 

//Extracción de los datos del localStorage (data.js) y funciones de auth.js
const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");
const formUsuario = document.getElementById("formUsuario");

// Crear y mostrar los usuarios en la tabla
function renderUsuarios() {
  tablaUsuarios.innerHTML = "";
// Recorremos los usuarios y creamos las filas de la tabla
  usuarios.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${u.password}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-danger" onclick="borrarUsuario(${u.id})">
          Eliminar
        </button>
      </td>
    `;
    tablaUsuarios.appendChild(tr);
  });
}

// Añadir nuevo usuario
formUsuario.addEventListener("submit", e => {
  e.preventDefault();

  // Generamos un ID numérico secuencial
  // Si no hay usuarios, el primer ID será 1, de lo contrario se toma el mayor ID + 1
  const nuevoId = usuarios.length > 0
    ? Math.max(...usuarios.map(u => u.id)) + 1
    : 1;

  const nuevo = {
    id: nuevoId, // ID secuencial
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim()
  };

  // Si el email ya existe, no se puede añadir
  if (usuarios.some(u => u.email === nuevo.email)) {
    alert("⚠️ Ya existe un usuario con este correo.");
    return;
  }

  // Si todo está bien, añadimos el nuevo usuario al array y refrescamos la tabla
  usuarios.push(nuevo);
  guardarDatos(); //Guardar usuarios en persistencia
  renderUsuarios();
  formUsuario.reset();
  alert("✅ Usuario añadido correctamente.");
});

// Borramos el usuario (antes de borrar, pedimos confirmación)
function borrarUsuario(id) {
  const index = usuarios.findIndex(u => u.id === id);
  if (index > -1 && confirm("¿Seguro que quieres eliminar este usuario?")) {
    usuarios.splice(index, 1);
    guardarDatos(); // Guardamos después de borrar
    renderUsuarios();
  }
}
// Inicializamos la tabla de usuarios al cargar la página
renderUsuarios();
