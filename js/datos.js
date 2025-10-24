export const db_inicial = {
    users: [
        { id: 1, email: 'admin@voluntarios.com', pass: '1234', name: 'Admin User' },
        { id: 2, email: 'ana@voluntarios.com', pass: 'ana', name: 'Ana López' },
        { id: 3, email: 'juan@voluntarios.com', pass: 'juan', name: 'Juan García' }
    ],
    voluntariados: [
        { id: 1, type: 'oferta', title: 'Clases de guitarra', description: 'Ofrezco clases de guitarra para principiantes los fines de semana.', user: 'Ana López', contact: 'ana@voluntarios.com' },
        { id: 2, type: 'peticion', title: 'Prácticas de programación', description: 'Necesito ayuda para preparar unas prácticas de DAW.', user: 'Juan García', contact: 'juan@voluntarios.com' },
        { id: 3, type: 'oferta', title: 'Clases de inglés', description: 'Clases de inglés de lunes a viernes.', user: 'Paloma López', contact: 'paloman@voluntarios.com' },
        { id: 4, type: 'peticion', title: 'Salir a correr', description: 'Busco gente interesada en hacer footing.', user: 'Paco Montes', contact: 'paco@voluntarios.com' }
    ]
};