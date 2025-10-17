    // ----- Mostrar usuario en navbar -----
    function mostrarUsuarioNavbar() {
      const navUser = document.getElementById('usuarioNavbar');
      if (!navUser) return;
      let usuario = sessionStorage.getItem('usuarioActivo') || localStorage.getItem('usuarioActivo');
      if (usuario) {
        usuario = JSON.parse(usuario);
        navUser.innerHTML = `
          <i class="bi bi-person-circle me-1"></i>
          ${usuario.nombre}
          <button id="logoutBtn" class="btn btn-sm btn-outline-secondary ms-2" title="Cerrar sesión">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        `;
        // Botón logout funcional
        setTimeout(() => {
          const btn = document.getElementById('logoutBtn');
          if (btn) {
            btn.addEventListener('click', function() {
              sessionStorage.removeItem('usuarioActivo');
              localStorage.removeItem('usuarioActivo');
              mostrarUsuarioNavbar();
            });
          }
        }, 50);
      } else {
        navUser.innerHTML = `<i class="bi bi-person-circle me-1"></i> -no login-`;
      }
    }
    window.addEventListener('DOMContentLoaded', mostrarUsuarioNavbar);

    // ----- Lógica de login -----
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const errorDiv = document.getElementById('loginError');
      const usuario = window.usuarios.find(u =>
        u.email === email && u.password === password
      );
      if (usuario) {
        const usuarioSesion = {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        };
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioSesion));
        localStorage.removeItem('usuarioActivo');
        errorDiv.classList.add('d-none');
        mostrarUsuarioNavbar();
      } else {
        errorDiv.textContent = "Email o contraseña incorrectos";
        errorDiv.classList.remove('d-none');
      }
    });
