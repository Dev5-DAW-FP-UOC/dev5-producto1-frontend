'use strict';
import { listCards, listUsuario } from "./datos.js";

const rowCard = document.getElementById("rowCard");
const filtroTipoBtns = document.querySelectorAll(".filtro-tipo");
const filtroCatBtns = document.querySelectorAll(".filtro-cat");

// Variables para guardar filtros seleccionados
let filtroTipo = "todos";
let filtroCat = "todas";

// Función para renderizar tarjetas según filtros
function renderCards() {
  rowCard.innerHTML = "";

  const filtradas = listCards.filter(card => {
    // Filtrar por tipo
    const matchTipo = filtroTipo === "todos" || card.tipo === filtroTipo;
    // Filtrar por categoría
    const matchCat = filtroCat === "todas" || card.categoria === filtroCat;

    return matchTipo && matchCat;
  });

  for (let card of filtradas) {
    let nombre = "";
    for(let user of listUsuario){
        if (card.usuario == user.id){
            nombre = user.nombre;
        }
    }
    let anuncio = `
    <div class="col-md-6 col-xl-3 mb-5">
        <div class="card pb-3 ${card.tipo}" style="width: 18rem; ">
            <div class="card-body">
                <h5 class="card-title text-center mb-3">${card.titulo}</h5>
                <h6 class="card-subtitle mb-2">${card.fecha}</h6>
                <p class="card-text">${card.descripcion}</p>
                <h6 class="card-user">${nombre}</h6>
                <div class="d-flex justify-content-center">
                    <img src="../img/categoria/${card.tipo}/${card.categoria}.png" alt="categoria" width=50>
                </div>
            </div>
        </div>
    </div>`;
    rowCard.innerHTML += anuncio;
  }
}

// Controladores de eventos para botones filtro de tipo
filtroTipoBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filtroTipoBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filtroTipo = btn.getAttribute("tipo");
    renderCards();
  });
});

// Controladores de eventos para botones filtro de categoría
filtroCatBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filtroCatBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filtroCat = btn.getAttribute("categoria");
    renderCards();
  });
});

// Render inicial de todas las tarjetas
renderCards();





    
