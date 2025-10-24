import { checkLogin, getLoggedInUser, handleLogout, updateNavbar } from './auth.js';
import { db_inicial } from './datos.js';

let db_local = JSON.parse(JSON.stringify(db_inicial));

document.addEventListener('DOMContentLoaded', () => {
    const user = checkLogin();
    updateNavbar();

    document.getElementById('nav-link-logout').addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });

    const volunteerForm = document.getElementById('volunteer-form');
    const volunteerTableBody = document.getElementById('volunteer-table-body');

    renderVolunteerTable();

    volunteerForm.addEventListener('submit', (e) => handleAddVolunteer(e, user));

    volunteerTableBody.addEventListener('click', (e) => {
        const deleteButton = e.target.closest('.btn-delete-volunteer');
        if (deleteButton) {
            const volunteerId = parseInt(deleteButton.dataset.volunteerId, 10);
            if (confirm(`¿Estás seguro de que quieres eliminar este item de voluntariado?`)) {
                handleDeleteVolunteer(volunteerId);
            }
        }
    });
});

function renderVolunteerTable() {
    const volunteerTableBody = document.getElementById('volunteer-table-body');
    volunteerTableBody.innerHTML = '';
    
    db_local.voluntariados.forEach(item => {
        const badgeClass = item.type === 'oferta' ? 'bg-success' : 'bg-primary';
        const row = `
            <tr>
                <td>${item.title}</td>
                <td><span class="badge ${badgeClass} rounded-pill">${item.type}</span></td>
                <td>${item.user}</td>
                <td>
                    <button class="btn btn-sm btn-delete-volunteer" data-volunteer-id="${item.id}" title="Eliminar voluntariado">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        `;
        volunteerTableBody.innerHTML += row;
    });
}

function handleAddVolunteer(e, loggedInUser) {
    e.preventDefault();
    
    const volunteerType = document.getElementById('volunteer-type');
    const volunteerTitle = document.getElementById('volunteer-title');
    const volunteerDescription = document.getElementById('volunteer-description');

    const newVolunteerItem = {
        id: Date.now(),
        type: volunteerType.value,
        title: volunteerTitle.value,
        description: volunteerDescription.value,
        user: loggedInUser.name,
        contact: loggedInUser.email
    };
    
    db_local.voluntariados.push(newVolunteerItem);
    
    renderVolunteerTable();
    
    e.target.reset();
}

function handleDeleteVolunteer(volunteerId) {
    db_local.voluntariados = db_local.voluntariados.filter(item => item.id !== volunteerId);
    
    renderVolunteerTable();
}