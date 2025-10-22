'use strict';

import {listUsuario} from "./datos.js";

//lista de usuarios

let rowUser = document.getElementById("usuarios-lista");
let inputNombre = document.getElementById("input-nombre");
let inputEmail = document.getElementById("input-correo");
let inputPassword = document.getElementById("input-contraseña");
let darAlta = document.getElementById("dar-alta");


function listadoUsuarios(usuario, indice){
    let registro = `
    <div class="row">
    <div class="col border p-2 nombre">
        ${usuario.nombre}
    </div>
    <div class="col border p-2 ">
        ${usuario.correo}
    </div>
    <div class="col border p-2">
        ${usuario.contraseña}    
    </div>
    <div class="col border p-2">
        <div class="d-flex justify-content-center mb-3">
            <button type="button" class="btn btn-danger eliminar" data-index="${indice}">Borrar</button>
        </div>
    </div>
    </div>
    `
    rowUser.innerHTML += registro;
    
}

function iteracionLista(){
    rowUser.innerHTML = "";
    let indice = 0;
    for(let usuario of listUsuario){
        listadoUsuarios(usuario, indice);
        indice++;
    }
}

//eliminar usuario
rowUser.addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar")) {
        let indice = parseInt(event.target.getAttribute("data-index"), 10);
        
        if (!isNaN(indice) && indice >= 0 && indice < listUsuario.length) {
            listUsuario.splice(indice, 1);
            iteracionLista();
        }
    }
});


iteracionLista();

//añadir usuario

function addUsuario(event){
    event.preventDefault();

    if(inputNombre.value && inputEmail.value && inputPassword.value){
        let existe = false;

        for(let user of listUsuario){
            if(user.correo === inputEmail.value){
                existe = true;
            }
        }

        if(!existe){
            listUsuario.push({
                nombre: inputNombre.value,
                correo: inputEmail.value,
                contraseña: inputPassword.value
            });
            iteracionLista();
        }else{
            alert("Este usuario ya existe");
        }

        console.log(existe);
    }else{
        alert("No se han introducido todos los datos");
    }
}

darAlta.addEventListener('click', (event) => { 
    event.preventDefault();


    addUsuario(event);

 
    const collapseElement = document.getElementById('collapseUser');
    const bsCollapse = bootstrap.Collapse.getInstance(collapseElement) || new bootstrap.Collapse(collapseElement);

    bsCollapse.hide();

    inputNombre.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
});