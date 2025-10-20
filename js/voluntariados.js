// --- Funciones del Voluntariado ---

//Extracción de los datos del localStorage (data.js) y funciones de auth.js
mostrarUsuarioEnMenu();

const tabla = document.querySelector("#tablaVoluntariados tbody");
const form = document.getElementById("formVoluntariado");

// Crear y mostrar los voluntariados en la tabla
function renderVoluntariados() {
  tabla.innerHTML = "";
  voluntariados.forEach(v => {
    const creador = usuarios.find(u => u.id === v.creadorId)?.nombre || "Desconocido";
    const tr = document.createElement("tr");
    // Creamos las clases CSS para los botones de tipo y categoría
    const tipoClass = v.tipo.toLowerCase();// Oferta o Petición
    const categoriaClass = v.categoria.toLowerCase(); // Idiomas, Deportes, Profesiones
    // Rellenamos la fila de la tabla
    tr.innerHTML = `
      <td>${v.id}</td>
      <td>${v.titulo}</td>
      <td>
       <span class="${v.tipo.toLowerCase() === 'oferta' ? 'tipo-oferta' : 'tipo-peticion'}">
       ${v.tipo}
       </span>
       </td>
       <td>${v.fecha}</td>
       <td>${v.modalidad}</td>
       <td> <span class="categoria-${v.categoria.toLowerCase()}">${v.categoria}</span>
       </td>
         <td>
          <button class="btn btn-sm btn-success" onclick="editarVoluntariado(${v.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="borrarVoluntariado(${v.id})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(tr);
  });
}

// Añadir voluntariado
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = getUsuarioLogueado();
  // Si no hay usuario logueado, no puede crear voluntariados!!
  if (!user) {
    alert("⚠️ Debes iniciar sesión para crear un voluntariado.");
    return;
  }

  // Generamos un ID numérico secuencial
  // Si no hay voluntariados, el primer ID será 1, de lo contrario se toma el mayor ID + 1
  const nuevoId = voluntariados.length > 0
    ? Math.max(...voluntariados.map(v => v.id)) + 1
    : 1;

  // Creamos el nuevo voluntariado con los datos del formulario
  const nuevo = {
    id: nuevoId, // ID secuencial
    tipo: document.getElementById("tipo").value,
    titulo: document.getElementById("titulo").value,
    fecha: document.getElementById("fecha").value,
    descripcion: document.getElementById("descripcion").value,
    creadorId: user.id,
    modalidad: document.getElementById("modalidad").value,
    categoria: document.getElementById("categoria").value
  };

  // Añadimos el nuevo voluntariado al array y refrescamos la tabla
  voluntariados.push(nuevo);
  renderVoluntariados();
  form.reset();

  // Mostramos una alerta de éxito
  const alerta = document.createElement("div");
  alerta.className = "alert alert-success mt-3";
  alerta.textContent = "✅ Voluntariado añadido correctamente";
  form.after(alerta);
  setTimeout(() => alerta.remove(), 2000);
});


// Editar voluntariado (título por ahora)
function editarVoluntariado(id) {
  const voluntariado = voluntariados.find(v => v.id === id);
  if (!voluntariado) return;
  const nuevoTitulo = prompt("Editar Título:", voluntariado.titulo);
  if (nuevoTitulo !== null) {
    voluntariado.titulo = nuevoTitulo.trim() || voluntariado.titulo;
    renderVoluntariados();
  }
}
// Borrar voluntariado
function borrarVoluntariado(id) {
  const index = voluntariados.findIndex(v => v.id === id);
  if (index > -1) {
    voluntariados.splice(index, 1);
    renderVoluntariados();
  }
}
// Mostrar los voluntariados al cargar la página
renderVoluntariados();
