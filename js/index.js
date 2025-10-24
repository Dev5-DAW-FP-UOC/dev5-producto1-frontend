import { checkLogin, handleLogout, updateNavbar } from './auth.js';
import { db_inicial } from './datos.js';

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    
    updateNavbar();

    const navLinkLogout = document.getElementById('nav-link-logout');
    navLinkLogout.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });

    renderDashboard(db_inicial);
});

function renderDashboard(db) {
    const dashboardContainer = document.getElementById('dashboard-container');
    if (!dashboardContainer) return;

    dashboardContainer.innerHTML = '';
    
    db.voluntariados.forEach(item => {
        const isOferta = item.type === 'oferta';
        const cardClass = isOferta ? 'card-oferta' : 'card-peticion';
        const badgeClass = isOferta ? 'bg-success' : 'bg-primary';
        const badgeText = isOferta ? 'Oferta' : 'Petición';

        const cardHTML = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm rounded-3 ${cardClass}">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">${item.title}</h5>
                        <span class="badge ${badgeClass} rounded-pill">${badgeText}</span>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${item.description}</p>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <small class="text-muted">Publicado por: ${item.user}</small><br>
                        <small class="text-muted">Contacto: ${item.contact}</small>
                    </div>
                </div>
            </div>
        `;
        dashboardContainer.innerHTML += cardHTML;
    });
}