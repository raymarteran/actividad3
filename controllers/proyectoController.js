const Proyecto = require('../models/proyectoModel.js');
const Actividad = require('../models/actividadModel.js');
const ActRealizada = require('../models/actRealizadaModel.js');

class ProyectoController {
    getProyectos() {
        return new Promise(async (resolve, reject) => {
            try {
                const proyectos = await Proyecto.find().populate('idActividad');
                if (proyectos.length === 0) {
                    resolve({ status: 404, message: 'No hay proyectos' });
                } else {
                    resolve(proyectos);
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener los proyectos' });
            }
        });
    }

    postProyecto(body) {
        return new Promise(async (resolve, reject) => {
            try {
                let newProyecto = body;

                // Validar si ya existe un proyecto con el mismo nombre
                const exists = await Proyecto.findOne({ name: newProyecto.name });
                if (exists) {
                    reject({ status: 400, message: 'Ya existe un proyecto con ese nombre' });
                    return;
                }

                // Guardar el nuevo proyecto
                const proyecto = new Proyecto(newProyecto);
                await proyecto.save();

                resolve({ status: 201, message: 'Proyecto creado correctamente', proyecto });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear el proyecto' });
            }
        });
    }

    getActividadesRealizadas(idProyecto) {
        return new Promise(async (resolve, reject) => {
            try {
                const proyecto = await Proyecto.findById(idProyecto).populate('idActividad');
                if (!proyecto) {
                    reject({ status: 404, message: 'Proyecto no encontrado' });
                    return;
                }

                const actividadesRealizadas = await ActRealizada.find({ idActividad: proyecto.idActividad._id });
                if (!actividadesRealizadas || actividadesRealizadas.length === 0) {
                    reject({ status: 404, message: 'No se encontraron actividades realizadas por este proyecto' });
                } else {
                    resolve(actividadesRealizadas);
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener las actividades realizadas' });
            }
        });
    }

    getTiempoUsado() {
        return new Promise(async (resolve, reject) => {
            try {
                const actividadesRealizadas = await ActRealizada.find().populate('idActividad');
                actividadesRealizadas.forEach(actR => {
                    actR.tiempoUso = Math.round((new Date(actR.dateFinal) - new Date(actR.dateInicio)) / (1000 * 60 * 60 * 24));
                });

                resolve(actividadesRealizadas);
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener el tiempo usado' });
            }
        });
    }

    deleteProyecto(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const proyecto = await Proyecto.findByIdAndDelete(id);
                if (!proyecto) {
                    reject({ status: 404, message: 'Proyecto no encontrado' });
                    return;
                }

                // Eliminar actividades y actividades realizadas relacionadas
                await Actividad.deleteMany({ idProyecto: proyecto._id });
                await ActRealizada.deleteMany({ idActividad: { $in: proyecto.idActividad } });

                resolve({ status: 200, message: 'Proyecto eliminado correctamente' });
            } catch (error) {
                reject({ status: 500, error: 'Error al eliminar el proyecto' });
            }
        });
    }
}

module.exports = ProyectoController;