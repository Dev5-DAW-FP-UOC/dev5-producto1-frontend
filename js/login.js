// --- Módulo de inicio de sesión (login.js) ---
// Este script gestiona el proceso de login del usuario

// Obtenemos la referencia al formulario del login
const formLogin = document.getElementById("loginForm");

// Solo ejecutamos el código si estamos en login.html
if (formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitamos que recargue la página al enviar el formulario!!

    // Capturamos los datos introducidos en el formulario
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // Buscamos al usuario en el array usuarios definido en data.js
    const user = usuarios.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    // Si encontramos el usuario, lo guardamos como "usuarioLogueado"
    if (user) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(user)); // Guardamos en localStorage
      alert(`✅ Bienvenido, ${user.nombre}`);
      window.location.href = "index.html";
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  });
}
