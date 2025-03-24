const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActividadSchema = new Schema({
  name: { type: String, required: true, unique: true },
  idCategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

module.exports = mongoose.model('Actividad', ActividadSchema);

/*const Actividades = require('../database/dataBase.js').Actividades;
const Categorias = require('../database/dataBase.js').Categorias;

class ActividadModel {
    getActividades() {
        return Actividades.map(actividad => {
            const categoria = Categorias.find(cat => cat.id === actividad.idCategoria);
            return {
                ...actividad,
                categoria: categoria ? { id: categoria.id, name: categoria.name } : []
            };
        });
    }

    postActividad(actividad) {
        return new Promise((resolve, reject) => {
            try {
                // Validar que no exista ya una actividad con el mismo nombre
                const actividadExists = Actividades.some(act => act.name === actividad.name);
                if (actividadExists) {
                    reject({ status: 400, message: 'Ya existe una actividad con ese nombre' });
                    return;
                }

                // Asignar un ID único a la nueva actividad
                actividad.id = Actividades.length + 1;

                // Guardar la nueva actividad
                Actividades.push(actividad);
                resolve({ status: 201, message: 'Actividad creada correctamente', actividad });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear la actividad' });
            }
        });
    }
}

module.exports = ActividadModel;*/

// para guardar una nueva categoria:
/*
{
    "name": "Actividad 1",
    "idCategoria": 2,
    "idUser": 1
}
*/