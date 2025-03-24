const ActRealizada = require('../models/actRealizadaModel.js'); // Asumiendo que tienes un modelo de Mongoose para Actividades Realizadas
const Categoria = require('../models/categoriesModel.js'); // Asumiendo que tienes un modelo de Mongoose para Categorías

class ActividadRealizadaController {
    getActRealizadas() {
        return new Promise(async (resolve, reject) => {
            try {
                const allActR = await ActRealizada.find();
                if (allActR.length === 0) {
                    resolve({ status: 404, message: 'No hay actividades realizadas' });
                } else {
                    resolve(allActR);
                }
            } catch (error) {
                console.error("Error al obtener actividades realizadas:", error);
                reject({ status: 500, error: 'Error al obtener las actividades realizadas' });
            }
        });
    }

    postActividadRealizada(body) {
        return new Promise(async (resolve, reject) => {
            try {
                let newAR = body;

                // Validar que no exista ya una actividad con el mismo nombre
                const exists = await ActRealizada.findOne({ name: newAR.name });
                if (exists) {
                    reject({ status: 400, message: 'Ya existe una actividad con ese nombre' });
                    return;
                }

                // Validar que la categoría exista
                const idCategoria = newAR.idCategoria;
                const categoryExists = await Categoria.findById(idCategoria);
                if (!categoryExists) {
                    reject({ status: 400, message: 'La categoría no existe, debe crear una categoría primero' });
                    return;
                }

                // Agregar status al crear en pendiente
                newAR.status = 'pending';

                // Guardar la nueva actividad realizada
                const actividadRealizada = new ActRealizada(newAR);
                await actividadRealizada.save();

                resolve({ status: 201, message: 'Actividad realizada creada correctamente', actividad: actividadRealizada });
            } catch (error) {
                console.error("Error al crear la actividad realizada:", error);
                reject({ status: 500, error: 'Error al crear la actividad realizada' });
            }
        });
    }

    getActividadesRealizadasPorFechas(desde, hasta) {
        return new Promise(async (resolve, reject) => {
            try {
                const actividades = await ActRealizada.find({
                    date: { $gte: new Date(desde), $lte: new Date(hasta) }
                });
                if (!actividades || actividades.length === 0) {
                    resolve({ status: 404, message: 'No se encontraron actividades realizadas en ese rango de fechas' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                console.error("Error al obtener actividades realizadas por fechas:", error);
                reject({ status: 500, error: 'Error al obtener las actividades realizadas por fechas' });
            }
        });
    }

    getActividadesRealizadasPorNombreActividad(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const actividades = await ActRealizada.find({ name: name });
                if (!actividades || actividades.length === 0) {
                    resolve({ status: 404, message: 'No se encontraron actividades realizadas con ese nombre' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                console.error("Error al obtener actividades realizadas por nombre:", error);
                reject({ status: 500, error: 'Error al obtener las actividades realizadas por nombre' });
            }
        });
    }

    getActividadesAbiertas() {
        return new Promise(async (resolve, reject) => {
            try {
                const actividades = await ActRealizada.find({ status: 'pending' });
                if (!actividades || actividades.length === 0) {
                    resolve({ status: 404, message: 'No se encontraron actividades abiertas' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                console.error("Error al obtener actividades abiertas:", error);
                reject({ status: 500, error: 'Error al obtener las actividades abiertas' });
            }
        });
    }

    deleteActividadRealizada(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const actividad = await ActRealizada.findByIdAndDelete(id);
                if (!actividad) {
                    resolve({ status: 404, message: 'Actividad realizada no encontrada' });
                } else {
                    resolve({ status: 200, message: 'Actividad realizada eliminada correctamente' });
                }
            } catch (error) {
                console.error("Error al eliminar la actividad realizada:", error);
                reject({ status: 500, error: 'Error al eliminar la actividad realizada' });
            }
        });
    }

    putActividadRealizada(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedActividad = await ActRealizada.findByIdAndUpdate(id, body, { new: true });
                if (!updatedActividad) {
                    resolve({ status: 404, message: 'Actividad realizada no encontrada' });
                } else {
                    resolve({ status: 200, message: 'Actividad realizada actualizada correctamente', actividad: updatedActividad });
                }
            } catch (error) {
                console.error("Error al actualizar la actividad realizada:", error);
                reject({ status: 500, error: 'Error al actualizar la actividad realizada' });
            }
        });
    }
}

module.exports = ActividadRealizadaController;