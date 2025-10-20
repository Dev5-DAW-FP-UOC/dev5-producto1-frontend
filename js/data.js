// js/data.js

//Usuarios
let usuarios = [
  { id: 1, nombre: "admin", email: "admin@mail.com", password: "root" },
  { id: 2, nombre: "Milena", email: "maguilarp@uoc.edu", password: "root" },
  { id: 3, nombre: "Christian", email: "cgarciaa@uoc.edu", password: "root" },
  { id: 4, nombre: "Xavi", email: "xmiroc@uoc.edu", password: "root" },
  { id: 5, nombre: "Marc", email: "msolerf@uoc.edu", password: "root" },
  { id: 6, nombre: "Cèlia", email: "ctrullae@uoc.edu", password: "root" },
];

//Voluntariados 
//Peticiones
let voluntariados = [
  {
    id: 1,
    tipo: "Petición",
    titulo: "Voluntario de Conversación en Inglés",
    fecha: "25-11-2025",
    descripcion: "Busco a alguien que quiera dedicar 1 hora a la semana para practicar conversación en inglés conmigo. Nivel B1. Me gustaría mejorar la fluidez para entrevistas de trabajo",
    creadorId: 2,
    modalidad: "Presencial",
    categoria: "Idiomas"
  },
  {
    id: 2,
    tipo: "Petición",
    titulo: "Ayuda con Diseño Gráfico Básico",
    fecha: "10-12-2025",
    descripcion: "Necesito la ayuda de un profesional de diseño gráfico (estudiante o aficionado avanzado) para crear un logo y una plantilla de folleto para una pequeña ONG local. Se requiere manejo de software básico",
    creadorId: 3,
    modalidad: "Online",
    categoria: "Profesiones"
  },
  {
    id: 3,
    tipo: "Petición",
    titulo: "Compañero para Entrenamientos de Baloncesto",
    fecha: "01-11-2025",
    descripcion: "Busco un compañero/a para entrenar y jugar partidos de baloncesto 2 veces por semana. Nivel intermedio. Quiero preparar una maratón local.",
    creadorId: 4,
    modalidad: "Presencial",
    categoria: "Deportes"
  },
  {
    id: 4,
    tipo: "Petición",
    titulo: "Clases de Apoyo de Matemáticas (ESO)",
    fecha: "15-11-2025",
    descripcion: "Mi hijo necesita apoyo voluntario de un profesor o estudiante de matemáticas a nivel de ESO, 2 tardes a la semana, para repasar conceptos básicos.",
    creadorId: 5,
    modalidad: "Online",
    categoria: "Profesiones"
  },
  {
    id: 5,
    tipo: "Petición",
    titulo: "Tutor de Japonés - Nivel Inicial",
    fecha: "20-12-2025",
    descripcion: "Me encantaría aprender los conceptos básicos del idioma japonés (Hiragana, Katakana y saludos). Busco un tutor voluntario que me guíe de forma inicial una vez por semana",
    creadorId: 6,
    modalidad: "Online",
    categoria: "Idiomas"
  },
  //Ofertas
  {
    id: 6,
    tipo: "Oferta",
    titulo: "Tutorías de Español para Extranjeros",
    fecha: "20-12-2025",
    descripcion: "Ofrezco mi tiempo para ayudar a extranjeros a practicar y mejorar su español conversacional o gramática. Soy hablante nativo y tengo experiencia previa. Disponible en línea o presencial.",
    creadorId: 2,
    modalidad: "Online",
    categoria: "Idiomas"
  },
  {
    id: 7,
    tipo: "Oferta",
    titulo: "Entrenador de Voleibol Femenino",
    fecha: "16-12-2025",
    descripcion: "Ofrezco mis servicios como entrenador voluntario de voleibol para un equipo amateur o grupo de amigos. Experiencia de 5 años como jugador y 2 como monitor.",
    creadorId: 3,
    modalidad: "Presencial",
    categoria: "Deportes"
  },
  {
    id: 8,
    tipo: "Oferta",
    titulo: "Asesoría de CV y Entrevistas (IT)",
    fecha: "01-12-2025",
    descripcion: "Soy profesional de Recursos Humanos en el sector IT. Ofrezco mi tiempo para revisar currículums, cartas de presentación y simular entrevistas de trabajo. Sesiones de 1 hora.",
    creadorId: 4,
    modalidad: "Presencial",
    categoria: "Profesiones"
  },
  {
    id: 9,
    tipo: "Oferta",
    titulo: "Clases de Natación para Principiantes",
    fecha: "20-11-2025",
    descripcion: "Ofrezco enseñar los conceptos básicos de natación a niños o adultos que estén empezando. Solo fines de semana en piscina pública. Soy socorrista certificado",
    creadorId: 5,
    modalidad: "Presencial",
    categoria: "Deportes"
  },
  {
    id: 10,
    tipo: "Oferta",
    titulo: "Traducción Simple (Francés-Español)",
    fecha: "15-11-2025",
    descripcion: "Ofrezco traducciones voluntarias sencillas de textos cortos o corrección de documentos entre francés y español (o viceversa). Nivel C1 en francés.",
    creadorId: 6,
    modalidad: "Online",
    categoria: "Idiomas"
  },
];
