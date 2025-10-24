import { db_inicial } from './datos.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPass = document.getElementById('login-pass');
    const loginAlert = document.getElementById('login-alert');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginAlert.style.display = 'none';

        const email = loginEmail.value;
        const pass = loginPass.value;

        const db = db_inicial;
        
        const user = db.users.find(u => u.email === email && u.pass === pass);

        if (user) {
            console.log("Login exitoso:", user.email);
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            console.warn("Intento de login fallido para:", email);
            loginAlert.style.display = 'block';
        }
    });
});