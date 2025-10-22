'use strict';

import {listUsuario} from "./datos.js";

let inputEmail = document.getElementById("input-email");
let inputPassword = document.getElementById("input-password");
let iniciarSesion = document.getElementById("iniciar-sesion");

function existeUsuario(event){
    event.preventDefault();
    let existeUsuario = false;
    let nombre;

    for (let usuario of listUsuario){
        if(usuario.correo == inputEmail.value && usuario.contraseña == inputPassword.value){
            existeUsuario = true;
            nombre = usuario.nombre;
            break;
        }
    }
    alert( existeUsuario ? "Usuario Correcto" : "Usuario Incorrecto");

    if(existeUsuario){
        const loginLink = document.querySelector('ul.navbar-nav.ms-auto .nav-link.active');
        if (loginLink) {
            loginLink.textContent = nombre;
        }
    }
    
}

iniciarSesion.addEventListener('click', existeUsuario);