'use strict';

let listCards = [
    {
        titulo: "Tutorías de Español para Extranjeros",
        descripcion: "Ofrezco mi tiempo para ayudar a extranjeros a practicar y mejorar su español conversacional o gramática. Soy hablante nativo y tengo experiencia previa. Disponible en línea o presencial.",
        fecha: "01/11/2025",
        tipo: "Oferta",
        categoria: "Idiomas",
        usuario: 4,
    },
    {
        titulo: "Tutor de Japonés - Nivel Inicial",
        descripcion: "Me encantaría aprender los conceptos básicos del idioma japonés (Hiragana, Katakana y saludos). Busco un tutor voluntario que me guíe de forma inicial una vez por semana.",
        fecha: "20/12/2025",
        tipo: "Petición",
        categoria: "Idiomas",
        usuario: 2,
    },
    {
        titulo: "Entrenador de Voleibol Femenino",
        descripcion: "Ofrezco mis servicios como entrenador voluntario de voleibol para un equipo amateur o grupo de amigos. Experiencia de 5 años como jugador y 2 como monitor.",
        fecha: "10/11/2025",
        tipo: "Oferta",
        categoria: "Deportes",
        usuario: 5,
    },
    {
        titulo: "Asesoría de CV y Entrevistas (IT)",
        descripcion: "Soy profesional de Recursos Humanos en el sector IT. Ofrezco mi tiempo para revisar currículums, cartas de presentación y simular entrevistas de trabajo. Sesiones de 1 hora.",
        fecha: "22/11/2025",
        tipo: "Oferta",
        categoria: "Profesiones",
        usuario: 1,
    },
    {
        titulo: "Ayuda con Diseño Gráfico Básico",
        descripcion: "Necesito la ayuda de un profesional de diseño gráfico (estudiante o aficionado avanzado) para crear un logo y una plantilla de folleto para una pequeña ONG local. Se requiere manejo de software básico.",
        fecha: "10/12/2025",
        tipo: "Petición",
        categoria: "Profesiones",
        usuario: 3,
    },
    {
        titulo: "Clases de Natación para Principiantes",
        descripcion: "Ofrezco enseñar los conceptos básicos de natación a niños o adultos que estén empezando. Solo fines de semana en piscina pública. Soy socorrista certificado.",
        fecha: "05/12/2025",
        tipo: "Oferta",
        categoria: "Deportes",
        usuario: 2,
    },
    {
        titulo: "Compañero para Entrenamientos de Baloncesto",
        descripcion: "Busco un compañero/a para entrenar y jugar partidos de baloncesto 2 veces por semana. Nivel intermedio. Quiero preparar una maratón local.",
        fecha: "01/11/2025",
        tipo: "Petición",
        categoria: "Deportes",
        usuario: 4,
    },
    {
        titulo: "Traducción Simple (Francés-Español)",
        descripcion: "Ofrezco traducciones voluntarias sencillas de textos cortos o corrección de documentos entre francés y español (o viceversa). Nivel C1 en francés.",
        fecha: "29/11/2025",
        tipo: "Oferta",
        categoria: "Idiomas",
        usuario: 1,
    },
    {
        titulo: "Voluntario de Conversación en Inglés",
        descripcion: "Busco a alguien que quiera dedicar 1 hora a la semana para practicar conversación en inglés conmigo. Nivel B1. Me gustaría mejorar la fluidez para entrevistas de trabajo.",
        fecha: "25/11/2025",
        tipo: "Petición",
        categoria: "Idiomas",
        usuario: 5,
    },
    {
        titulo: "Clases de Apoyo de Matemáticas (ESO)",
        descripcion: "Mi hijo necesita apoyo voluntario de un profesor o estudiante de matemáticas a nivel de ESO, 2 tardes a la semana, para repasar conceptos básicos.",
        fecha: "15/11/2025",
        tipo: "Petición",
        categoria: "Profesiones",
        usuario: 3,
    }
];

let listUsuario = [
    {
        id: 1,
        nombre: "Cèlia Trullà",
        correo: "celia@uoc.edu",
        contraseña: "1234"
    },
    {
        id: 2,
        nombre: "Christian García",
        correo: "chris@uoc.edu",
        contraseña: "1234"
    },
    {
        id: 3,
        nombre: "Milena Aguilar",
        correo: "mile@uoc.edu",
        contraseña: "1234"
    },
    {
        id: 4,
        nombre: "Xavi Miró",
        correo: "xavi@uoc.edu",
        contraseña: "1234"
    },
    {
        id: 5,
        nombre: "Marc Soler",
        correo: "marc@uoc.edu",
        contraseña: "1234"
    }
];

export {listCards, listUsuario};