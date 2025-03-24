const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProyectoSchema = new Schema({
  name: { type: String, required: true, unique: true },
  idActividad: { type: Number, required: true },
  idUser: { type: Number, required: true }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
/*const Proyectos = require('../database/dataBase.js').Proyectos;
const Actividades = require('../database/dataBase.js').Actividades;
const ActRealizada = require('../database/dataBase.js').ActRealizada;

class ProyectoModel {
    getProyectos() {
        return Proyectos.map(proyecto => {
            const actividades = Actividades.find(act => act.id === proyecto.idActividad);
            const actividadesRealizadas = ActRealizada.filter(actR => actR.idActividad === actividades.id);

            return {
                ...proyecto,
                actividades: actividades ? {
                    id: actividades.id,
                    name: actividades.name,
                    actividadesRealizadas: actividadesRealizadas.map(actR => (actR))
                } : [],
            };
        });
    }

    postProyecto(newProyecto) {
        return new Promise((resolve, reject) => {
            try {
                Proyectos.push(newProyecto);
                resolve(newProyecto);
            } catch (error) {
                reject(error);
            }
        });
    }

    getActividadesRealizadas(idProyecto) {
        return new Promise((resolve, reject) => {
            try {
                const proyecto = Proyectos.find(proy => proy.id === idProyecto);
                if (!proyecto) {
                    reject({ status: 404, message: 'Proyecto no encontrado' });
                    return;
                }

                const actividades = Actividades.find(act => act.id === proyecto.idActividad);
                const actividadesRealizadas = ActRealizada.filter(actR => actR.idActividad === actividades.id);

                resolve(actividadesRealizadas);
            } catch (error) {
                reject(error);
            }
        });
    }

    getTiempoUsado() {
        return new Promise((resolve, reject) => {
            try {
                const actividadesRealizadas = ActRealizada.map(actR => ({
                    ...actR,
                    actividades: Actividades.find(act => act.id === actR.idActividad)
                }));

                actividadesRealizadas.forEach(actR => {
                    actR.tiempoUso = Math.round((new Date(actR.dateFinal) - new Date(actR.dateInicio)) / (1000 * 60 * 60 * 24));
                });

                resolve(actividadesRealizadas);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteProyecto(idProyecto) {
        return new Promise((resolve, reject) => {
            try {
                const proyecto = Proyectos.find(proy => proy.id === idProyecto);
                if (!proyecto) {
                    reject({ status: 404, message: 'Proyecto no encontrado' });
                    return;
                }

                const actividades = Actividades.find(act => act.id === proyecto.idActividad);
                const actividadesRealizadas = ActRealizada.filter(actR => actR.idActividad === actividades.id);

                const indexProyecto = Proyectos.indexOf(proyecto);
                const indexActividades = Actividades.indexOf(actividades);
                const indexActividadesRealizadas = ActRealizada.indexOf(actividadesRealizadas);

                Proyectos.splice(indexProyecto, 1);
                Actividades.splice(indexActividades, 1);
                ActRealizada.splice(indexActividadesRealizadas, 1);

                resolve({ status: 200, message: 'Proyecto eliminado correctamente' });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = ProyectoModel;*/

// para guardar un nuevo proyecto:
/*
{
    "name": "nombredel proyecto",
    "idActividad": 1,
    "idActividadRealizada": 1
}
*/