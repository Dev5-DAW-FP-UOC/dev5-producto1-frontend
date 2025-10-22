'use strict';

import {listCards, listUsuario} from "./datos.js";

//lista de trabajos

let rowVolunt = document.getElementById("voluntariados-lista");
let inputTitulo = document.getElementById("input-titulo");
let inputUsuario = document.getElementById("select-user");
let inputFecha = document.getElementById("volDateId");
let inputDescripcion = document.getElementById("input-descripcion");
let inputTipo = document.getElementById("select-tipo");
let inputCategoria = document.getElementById("select-categoria");
let darAlta = document.getElementById("dar-alta");

function listadoTrabajos(trabajo, indice, nombre){
    let registro = `
    <div class="row">
    <div class="col-2 border p-2">
        ${trabajo.titulo}                        
    </div>
    <div class="col-2 border p-2">
        ${nombre}                         
    </div>
    <div class="col-2 border p-2">
        ${trabajo.fecha}                         
    </div>
    <div class="col-2 border p-2">
        ${trabajo.descripcion}                          
    </div>
    <div class="col-1 border p-2">
        ${trabajo.tipo}                          
    </div>
    <div class="col-2 border p-2">
        ${trabajo.categoria}                          
    </div>
    <div class="col-1 border p-2">
        <div class="d-flex justify-content-center mb-3">
            <button type="button" class="btn btn-danger eliminar" data-index="${indice}">Borrar</button>
        </div>
    </div>
    </div>
    `
    rowVolunt.innerHTML += registro;
}

function iteracionLista(){
    let nombre = "";
    rowVolunt.innerHTML = "";
    let indice = 0;
    for(let trabajo of listCards){
        for(let usuario of listUsuario){
            if(trabajo.usuario == usuario.id){
                nombre = usuario.nombre;
            }
        }
        listadoTrabajos(trabajo, indice, nombre);
        indice++;
    }
}


rowVolunt.addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar")) {
        let indice = parseInt(event.target.getAttribute("data-index"), 10);
        
        if (!isNaN(indice) && indice >= 0 && indice < listCards.length) {
            listCards.splice(indice, 1);
            iteracionLista();
        }
    }
});


iteracionLista();

//Selector usuario
let selectUser = document.getElementById("select-user");


selectUser.innerHTML += `<option disabled selected value> -- seleccione un usuario -- </option>`;
let contador = 1;
for(let user of listUsuario){
    let registro = `
    <option value="${user.id}">${user.nombre}</option>
    `
    selectUser.innerHTML += registro
}

//añadir trabajo

function addTrabajo(event){
    event.preventDefault();
    
    if(inputTitulo.value && inputUsuario.value && inputFecha.value && inputDescripcion.value && inputTipo.value && inputCategoria.value){
        let dateArray = inputFecha.value.split("-");
        let formatDate = dateArray[2] + "/" + dateArray[1] + "/" +dateArray[0];
        listCards.push({
            titulo: inputTitulo.value,
            usuario: inputUsuario.value,
            fecha: formatDate,
            descripcion: inputDescripcion.value,
            tipo: inputTipo.value,
            categoria: inputCategoria.value
        });
        iteracionLista();
    }else{
        alert("Falta introducir datos");
    }
}

darAlta.addEventListener('click', (event) => {
  event.preventDefault();


  addTrabajo(event);

 
  const collapseElement = document.getElementById('collapseAlta');
  const bsCollapse = bootstrap.Collapse.getInstance(collapseElement) || new bootstrap.Collapse(collapseElement);

  bsCollapse.hide();

  inputTitulo.value = '';
  inputUsuario.value = '';
  inputFecha.value = '';
  inputDescripcion.value = '';
  inputTipo.value = '';
  inputCategoria.value = '';
});
