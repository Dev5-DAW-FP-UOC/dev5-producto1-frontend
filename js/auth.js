// --- Funciones de inicio de sesión ---

// Función para buscar si el usuario está en localStorage (data.js)
function getUsuarioLogueado() {
  return JSON.parse(localStorage.getItem("usuarioLogueado"));
}

// Función para mostrar el usuario en la barra de navegación
function mostrarUsuarioEnMenu() {
  const user = getUsuarioLogueado(); // Llamamos a la función que obtiene el usuario
  const userEmailSpan = document.getElementById("userEmail"); // Obtenemos su email y más datos
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Si no existen los elementos, salimos
  if (!userEmailSpan || !loginBtn || !logoutBtn) return;

  if (user) { // Si hay usuario logueado
    userEmailSpan.textContent = `Conectado: ${user.email}`; // Mostramos su email
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else { // Si no hay usuario logueado
    userEmailSpan.textContent = "No has iniciado sesión"; 
    logoutBtn.style.display = "none";
  }
}

// Funciones para Log In y Log Out
// Log in manual (redirige a login.html)
function loginManual() { 
  window.location.href = "login.html";
}

// Log out (cierra la sesión)
function logout() {
  localStorage.removeItem("usuarioLogueado");
  alert("Sesión cerrada correctamente");
  mostrarUsuarioEnMenu();
}

// --- Inicialización al cargar el DOM ---
document.addEventListener("DOMContentLoaded", () => {
  // Botones login/logout
  document.getElementById("loginBtn")?.addEventListener("click", loginManual);
  document.getElementById("logoutBtn")?.addEventListener("click", logout);

  // Mostrar usuario en menú al cargar
  mostrarUsuarioEnMenu();

  // --- Formulario de login ---
  const loginForm = document.getElementById("loginForm");
  // Si no estamos en login.html, salimos
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Evitar recarga

      // Obtenemos los valores del formulario y los normalizamos
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value.trim();

      // Verificamos que la variable usuarios esté definida y tenga datos
      if (typeof usuarios === "undefined") {
        alert("Error interno: los datos de usuarios no están disponibles.");
        return;
      }

      // Buscamos el usuario en el array de usuarios (data.js)
      const user = usuarios.find(
        (u) => u.email.toLowerCase() === email && u.password === password
      );

      // Si lo encontramos, lo guardamos en localStorage y redirigimos al dashboard (index.html)
      if (user) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        alert(`✅ Bienvenido, ${user.nombre}`);
        window.location.href = "index.html"; 
      } else {
        alert("❌ Usuario o contraseña incorrectos");
      }
    });
  }
});
