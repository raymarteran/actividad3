const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permission: { type: String, required: true, default: 'user' }
});

UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('User', UserSchema);

/*const Users = require('../database/dataBase.js').Users;
const Proyectos = require('../database/dataBase.js').Proyectos;
const Habitos = require('../database/dataBase.js').Habitos;
const Categorias = require('../database/dataBase.js').Categorias;
const Actividades = require('../database/dataBase.js').Actividades;
const ActRealizada = require('../database/dataBase.js').ActRealizada;

class UsersModels {
    getUsers () {
        return Users.map(user => {
            const proyectos = Proyectos ? Proyectos.filter(pro => pro.idUser === user.id) : [];
            const habitos = Habitos ? Habitos.filter(hab => hab.idUser === user.id) : [];
            return {
                ...user,
                proyectos: proyectos ? proyectos : [],
                habitos: habitos ? habitos : []
            };
        });
    }

    getActividadesCategoriaUsuario (idUser, categoria) {
        //Mostrar las actividades de una categoría determinada de un usuario dado.
        const AllActividades = Actividades.map(act => {
            const categoria = Categorias ? Categorias.filter(cate => cate.id === act.idCategoria) : [];
            return {
                ...act,
                categoria: categoria ? categoria : []
            };
        });

        //filtrar por categoria name 
        const ActividadesCategoria = AllActividades.filter(act => act.categoria[0].name === categoria);


        //filtrar por idUser
        const ActividadesCategoriaUsuario = ActividadesCategoria.filter(act => {
            return act.idUser === idUser;
        });


        return ActividadesCategoriaUsuario
    }

    postUser (user) {
        return new Promise((resolve, reject) => {
            Users.push(user);
            resolve();
        })
    }
    
    //Mostrar las últimas 5 actividades realizadas por un usuario, incluyendo el nombre de la actividad y su categoría.
    getLastActividadesRealizadas (idUser) {
        //filtrar por idUser
        const actRe = ActRealizada.filter(act => {
            return act.idUser === idUser;
        });

        const ActividadesRealizadasOrdenadas = actRe.sort((a, b) => {
            return new Date(b.dateFinal) - new Date(a.dateFinal);
        });
        return ActividadesRealizadasOrdenadas.slice(0, 5);
    }
}

module.exports = UsersModels*/


// para guardar un usuario nuevo ejemplo:
/*
{
    "name": "Raymar",
    "lastName": "Teran",
    "userName": "raymarteran",
    "email": "2.raymar1@gmail.com",
    "password": "1234",
    "repassword": "1234"
}
    
*/