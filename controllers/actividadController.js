const Actividad = require('../models/actividadModel.js'); // Asumiendo que tienes un modelo de Mongoose para Actividades
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
                
class ActividadController {
    getActividades() {
        return new Promise(async (resolve, reject) => {
            try {
                const actividades = await Actividad.find().populate('idCategoria').populate('idUser');

                if (actividades.length === 0) {
                    resolve({ status: 404, message: 'No se encontraron actividades' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                console.error("Error al obtener actividades:", error);
                reject({ status: 500, error: 'Error al obtener las actividades' });
            }
        });
    }

    postActividad(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const newActivity = body;
                // Validar que todos los campos estén completos
                if (!newActivity.name || !newActivity.idCategoria || !newActivity.idUser) {
                    reject({ status: 400, error: 'Todos los campos son obligatorios' });
                    return;
                }

                // Validar que no exista ya una actividad con el mismo nombre
                const exists = await Actividad.findOne({ name: newActivity.name });
                if (exists) {
                    reject({ status: 400, error: 'Ya existe una actividad con ese nombre' });
                    return;
                }

                //Antes de guardar convertir idCategoria y idUser a ObjectId
                
                newActivity.idCategoria = new ObjectId(newActivity.idCategoria);
                newActivity.idUser = new ObjectId(newActivity.idUser);

                console.log("newActivity", newActivity);

                // Guardar la nueva actividad en la base de datos
                const actividad = new Actividad(newActivity);
                await actividad.save();

                resolve({ status: 201, message: 'Actividad creada correctamente', actividad });
            } catch (error) {
                console.error("Error al crear la actividad:", error);
                reject({ status: 500, error: 'Error al crear la actividad' });
            }
        });
    }

    deleteActividad(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const actividad = await Actividad.findByIdAndDelete(id);
                if (!actividad) {
                    resolve({ status: 404, message: 'Actividad no encontrada' });
                } else {
                    resolve({ status: 200, message: 'Actividad eliminada correctamente' });
                }
            } catch (error) {
                console.error("Error al eliminar la actividad:", error);
                reject({ status: 500, error: 'Error al eliminar la actividad' });
            }
        });
    }

    getActividadById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const actividad = await Actividad.findById(id).populate('idCategoria').populate('idUser');
                if (!actividad) {
                    resolve({ status: 404, message: 'Actividad no encontrada' });
                } else {
                    resolve(actividad);
                }
            } catch (error) {
                console.error("Error al obtener la actividad:", error);
                reject({ status: 500, error: 'Error al obtener la actividad' });
            }
        });
    }

    putActividad(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const actividad = await Actividad.findByIdAndUpdate(id, body, { new: true });
                if (!actividad) {
                    resolve({ status: 404, message: 'Actividad no encontrada' });
                } else {
                    resolve({ status: 200, message: 'Actividad actualizada correctamente', actividad });
                }
            } catch (error) {
                console.error("Error al actualizar la actividad:", error);
                reject({ status: 500, error: 'Error al actualizar la actividad' });
            }
        });
    }
}

module.exports = ActividadController;