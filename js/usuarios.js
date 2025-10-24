import { checkLogin, handleLogout, updateNavbar } from './auth.js';
import { db_inicial } from './datos.js';

let db_local = JSON.parse(JSON.stringify(db_inicial));

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    updateNavbar();

    document.getElementById('nav-link-logout').addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });

    const userForm = document.getElementById('user-form');
    const userTableBody = document.getElementById('user-table-body');

    renderUserTable();

    userForm.addEventListener('submit', handleAddUser);

    userTableBody.addEventListener('click', (e) => {
        const deleteButton = e.target.closest('.btn-delete-user');
        if (deleteButton) {
            const userId = parseInt(deleteButton.dataset.userId, 10);
            if (confirm(`¿Estás seguro de que quieres eliminar a este usuario?`)) {
                handleDeleteUser(userId);
            }
        }
    });
});

function renderUserTable() {
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = '';
    
    db_local.users.forEach(user => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-sm btn-delete-user" data-user-id="${user.id}" title="Eliminar usuario">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        `;
        userTableBody.innerHTML += row;
    });
}

function handleAddUser(e) {
    e.preventDefault();
    
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userPass = document.getElementById('user-pass');

    const newUser = {
        id: Date.now(),
        name: userName.value,
        email: userEmail.value,
        pass: userPass.value
    };
    
    db_local.users.push(newUser);
    
    renderUserTable();
    
    e.target.reset();
}

function handleDeleteUser(userId) {
    db_local.users = db_local.users.filter(user => user.id !== userId);
    
    renderUserTable();
}