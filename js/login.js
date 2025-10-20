// js/login.js

// ==============================
// Referencias a elementos del DOM
// ==============================
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const btnLogin = document.getElementById("btnLogin");
const loginError = document.getElementById("loginError");
const rememberMe = document.getElementById("rememberMe");
const usuarioNav = document.getElementById("usuarioNav");
const usuarioNombre = document.getElementById("usuarioNombre");
const btnLogout = document.getElementById("btnLogout");

// ==============================
// Habilitar/deshabilitar botón
// ==============================
loginForm.addEventListener("input", () => {
  btnLogin.disabled = !(emailInput.value && passwordInput.value);
});

// ==============================
// Cargar email si recordado y comprobar sesión previa
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("volunet_email");
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMe.checked = true;
    btnLogin.disabled = !passwordInput.value;
  }
  // Mostrar usuario si ya hay sesión activa
  mostrarUsuarioEnNav();
});

// ==============================
// Gestión submit login
// ==============================
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  loginError.classList.add("d-none");

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  const usuario = typeof usuarios !== "undefined" ? usuarios.find((u) => u.email.trim().toLowerCase() === email && u.password === password) : null;

  if (usuario) {
    // Guardar sesión simulada
    sessionStorage.setItem(
      "volunet_user",
      JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      })
    );

    // "Recordarme"
    if (rememberMe.checked) {
      localStorage.setItem("volunet_email", email);
    } else {
      localStorage.removeItem("volunet_email");
    }

    // Mostrar usuario en navbar
    mostrarUsuarioEnNav();

    // Limpiar campos y mensaje
    loginForm.reset();
    btnLogin.disabled = true;
    loginError.classList.add("d-none");
  } else {
    loginError.textContent = "Email o contraseña incorrectos.";
    loginError.classList.remove("d-none");
    sessionStorage.removeItem("volunet_user");
    mostrarUsuarioEnNav();
  }
});

// ==============================
// Mostrar usuario logueado (o no login) en el navbar
// ==============================
function mostrarUsuarioEnNav() {
  const user = sessionStorage.getItem("volunet_user");
  if (user) {
    const { nombre } = JSON.parse(user);
    usuarioNombre.textContent = nombre;
    btnLogout.classList.remove("d-none");
  } else {
    usuarioNombre.textContent = "- no login -";
    btnLogout.classList.add("d-none");
  }
}

// ==============================
// Logout
// ==============================
btnLogout.addEventListener("click", function () {
  sessionStorage.removeItem("volunet_user");
  mostrarUsuarioEnNav();
});
