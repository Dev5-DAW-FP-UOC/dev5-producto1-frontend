export function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem('loggedInUser'));
}

export function checkLogin() {
    const user = getLoggedInUser();
    if (!user) {
        console.warn("Usuario no logueado. Redirigiendo a login.html");
        window.location.href = 'login.html';
    }
    return user;
}

export function handleLogout() {
    sessionStorage.removeItem('loggedInUser');
    console.log("Usuario deslogueado.");
    window.location.href = 'login.html';
}

export function updateNavbar() {
    const user = getLoggedInUser();
    const navLinksLoggedIn = document.querySelectorAll('.nav-link-logged-in');
    const navLinksLogin = document.querySelectorAll('.nav-link-login');
    const userEmailDisplay = document.getElementById('user-email-display');

    if (user) {
        navLinksLoggedIn.forEach(link => link.style.display = 'block');
        navLinksLogin.forEach(link => link.style.display = 'none');
        if (userEmailDisplay) {
            userEmailDisplay.textContent = user.email;
        }
    } else {
        navLinksLoggedIn.forEach(link => link.style.display = 'none');
        navLinksLogin.forEach(link => link.style.display = 'block');
    }
}