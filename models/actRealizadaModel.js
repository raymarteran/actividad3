const mongoose = require('mongoose');

const actRealizadaSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    idActividad: { type: Number, required: true },
    dateInicio: { type: Date, required: true },
    dateFinal: { type: Date },
    status: { type: String, required: true, default: 'pending' },
    idUser: { type: Number, required: true }
});

module.exports = mongoose.model('ActRealizada', actRealizadaSchema);

/*const ActRealizada = require('../database/dataBase.js').ActRealizada;

class ActRealizadaModel {
    getActRealizadas() {
        return ActRealizada;
    }

    postActividadRealizada(newAR) {
        return new Promise((resolve, reject) => {
            try {
                ActRealizada.push(newAR);
                resolve(newAR);
            } catch (error) {
                reject(error);
            }
        });
    }

    getActividadesRealizadasPorFechas(startDate, endDate) {
        return new Promise((resolve, reject) => {
            try {
                const actividades = ActRealizada.filter(act => 
                    new Date(act.dateInicio) >= new Date(startDate) && 
                    new Date(act.dateFinal) <= new Date(endDate)
                );
                resolve(actividades);
            } catch (error) {
                reject(error);
            }
        });
    }

    getActividadesRealizadasPorNombreActividad(name) {
        return new Promise((resolve, reject) => {
            try {
                const actividadesRealizadas = ActRealizada.filter(act => act.name === name);
                resolve(actividadesRealizadas);
            } catch (error) {
                reject(error);
            }
        });
    }

    getActividadesAbiertas() {
        return new Promise((resolve, reject) => {
            try {
                const actividadesAbiertas = ActRealizada.filter(act => act.dateFinal === null);
                resolve(actividadesAbiertas);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteActividadRealizada(id) {
        return new Promise((resolve, reject) => {
            try {
                const index = ActRealizada.findIndex(act => act.id === id);
                if (index === -1) {
                    reject({ status: 404, message: 'Actividad realizada no encontrada' });
                    return;
                }
                ActRealizada.splice(index, 1);
                resolve({ status: 200, message: 'Actividad realizada eliminada correctamente' });
            } catch (error) {
                reject(error);
            }
        });
    }

    putActividadRealizada(id, newAR) {
        return new Promise((resolve, reject) => {
            try {
                const index = ActRealizada.findIndex(act => act.id === id);
                if (index === -1) {
                    reject({ status: 404, message: 'Actividad realizada no encontrada' });
                    return;
                }
                ActRealizada[index] = newAR;
                resolve({ status: 200, message: 'Actividad realizada actualizada correctamente', actividad: newAR });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = ActRealizadaModel;/*


// para guardar un nueva actividad realizada:
/*
{
    "name": "Actividad1",
    "description": "Actividad 1descripcion",
    "idActividad": 1,
    "dateInicio": "2025-02-03",
    "dateFinal": "2025-02-04",
    "status": "pending"
}
*/


///para hacer put de una actividad realizada
/*
{
    "name": "Actividad7",
    "description": "Actividad 7descripcion",
    "idActividad": 7,
    "dateInicio": "2025-02-03",
    "dateFinal": "2025-02-04",
    "status": "pending"
}
*/