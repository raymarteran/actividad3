let users = [
    {
        id: 1,
        name: 'Raymar',
        lastName: 'Teran',
        userName: 'raymarteran',
        email: 'teran.raymar1@gmail.com',
        password : '1234',
        repassword: '1234',
        permission: 'admin'
      }
];

let categories = [
    {
        id: 1,
        name: 'categoria1'
    },
    {
        id: 2,
        name: 'categoria2'
    },
    {
        id: 3,
        name: 'categoria3'
    }
];



let habitos = [
    {
        id: 1,
        name: 'Hábito 1',
        idActividad: 1,
        idUser: 1
    },
    {
        id: 2,
        name: 'Hábito 2',
        idActividad: 2,
        idUser: 2
    },
    {
        id: 3,
        name: 'Hábito 3',
        idActividad: 3,
        idUser: 3
    },
    {
        id: 4,
        name: 'Hábito4',
        idActividad: 1,
        idUser: 1
    }
]

let Proyectos = [
    {
        id: 1,
        name: 'Proyecto 1',
        idActividad: 1,
        idUser: 1
    },
    {
        id: 2,
        name: 'Proyecto 2',
        idActividad: 2,
        idUser: 2
    },
    {
        id: 3,
        name: 'Proyecto 3',
        idActividad: 3,
        idUser: 3
    }
]
let actividades = [
    {
        id: 1,
        name: 'Actividad 1',
        idCategoria: 2,
        idUser: 1
    },
    {
        id: 2,
        name: 'Actividad 2',
        idCategoria: 1,
        idUser: 1
    },
    {
        id: 3,
        name: 'Actividad 3',
        idCategoria: 3,
        idUser: 3
    },
    {
        id: 4,
        name: 'Actividad4',
        idCategoria: 2,
        idUser: 1
    }
];
let ActRealizada = [
    {
        id: 1,
        name: 'ActividadR1',
        description: 'Actividad 1descripcion',
        idActividad: 1,
        dateInicio: '2025-02-01',
        dateFinal: '2025-02-10',
        idUser: 1,
        status: 'completed'
    },
    {
        id: 2,
        name: 'ActividadR2',
        description: 'Actividad 2descripcion',
        idActividad: 1,
        dateInicio: '2025-02-07',
        dateFinal: '2025-02-09',
        idUser: 1,
        status: 'pending'
    },
    {
        id: 3,
        name: 'ActividadR3',
        description: 'Actividad 3descripcion',
        idActividad: 3,
        dateInicio: '2025-02-06',
        dateFinal: '2025-02-08',
        idUser: 1,
        status: 'completed'
    },
    {
        id: 4,
        name: 'ActividadR4',
        description: 'Actividad 4descripcion',
        idActividad: 1,
        dateInicio: '2025-02-05',
        dateFinal: '2025-02-07',
        idUser: 1,
        status: 'pending'
    },
    {
        id: 5,
        name: 'ActividadR5',
        description: 'Actividad 5descripcion',
        idActividad: 5,
        dateInicio: '2025-02-01',
        dateFinal: '2025-02-06',
        idUser: 1,
        status: 'pending'
    },
    {
        id: 6,
        name: 'ActividadR6',
        description: 'Actividad 6descripcion',
        idActividad: 6,
        dateInicio: '2025-02-02',
        dateFinal: '2025-02-05',
        idUser: 1,
        status: 'completed'
    },
    {
        id: 7,
        name: 'Actividad7',
        description: 'Actividad 7descripcion',
        idActividad: 7,
        dateInicio: '2025-02-03',
        dateFinal: '2025-02-04',
        idUser: 1,
        status: 'pending'
    },
    {
        id: 8,
        name: 'Actividad8',
        description: 'Actividad 8descripcion',
        idActividad: 8,
        dateInicio: '2025-02-04',
        dateFinal: null,
        idUser: 1,
        status: 'completed'
    }
]

exports.Users = users;
exports.Categorias = categories;
exports.Actividades = actividades;
exports.Habitos = habitos;
exports.Proyectos = Proyectos;
exports.ActRealizada = ActRealizada;
