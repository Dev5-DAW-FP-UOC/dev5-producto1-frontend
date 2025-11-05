// --- Almacenaje en localStorage ---
// Este script gestiona el guardado y recuperación de datos desde el localStorage del navegador.

// Guardar datos en localStorage (se hace conversión a JSON)
function guardarDatos() {
  // Guardamos los arrays de usuarios y voluntariados
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("voluntariados", JSON.stringify(voluntariados));
  console.log("✅ Datos guardados correctamente en localStorage");
}

// Cargar datos desde localStorage
function cargarDatos() {
  // Recuperamos los datos guardados, si existen
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
  const voluntariadosGuardados = JSON.parse(localStorage.getItem("voluntariados"));

  // Si existen datos guardados, los sobreescribimos en memoria
  if (usuariosGuardados) usuarios = usuariosGuardados;
  if (voluntariadosGuardados) voluntariados = voluntariadosGuardados;

  console.log("📦 Datos cargados desde localStorage");
}

// Limpiar todo el localStorage
function limpiarDatos() {
  localStorage.removeItem("usuarios");
  localStorage.removeItem("voluntariados");
  console.log("🗑️ Datos eliminados del localStorage");
}

// Al cargar el DOM, recuperamos los datos automáticamente
document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();
});
