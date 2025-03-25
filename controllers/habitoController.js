const HabitoModel = require('../models/habitoModel.js');
const User = require('../models/userModel.js');

class HabitoController {

    getHabitos(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                // Obtener todos los hábitos y a la vez los datos de la actividad relacionada y los datos del usuario relacionado
                const habitos = await HabitoModel.find()
                    .populate({
                        path: 'idActividad',
                        populate: {  // Segundo populate anidado para la categoría
                        path: 'idCategoria',
                        model: 'Categoria'  // Nombre del modelo de categoría
                        }
                    })
                    .populate('idUser');
                resolve(habitos);
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener los hábitos' });
            }
        });
    }

    postHabito(body) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("bodydel controller", body);
                const newHabito = body;


                // Validar si ya existe un hábito con el mismo nombre
                const habitos = await HabitoModel.find();
                const exists = habitos.some(hab => hab.name === newHabito.name);
                if (exists) {
                    resolve({ status: 400, message: 'Ya existe un hábito con ese nombre' });
                    return;
                }

                // Guardar el nuevo hábito
                const newhabito = new HabitoModel(newHabito);
                const habitoCreado = await newhabito.save();
                resolve({ status: 201, message: 'Hábito creado correctamente', habito: habitoCreado });
            } catch (error) {
                console.log("error", error);
                reject({ status: 500, error: 'Error al crear el hábito' });
            }
        });
    }

    deleteHabito(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedHabito = await HabitoModel.findByIdAndDelete(id);
                if (!deletedHabito) {
                    resolve({ status: 404, message: 'Hábito no encontrado' });
                } else {
                    resolve({ status: 200, message: 'Hábito eliminado correctamente', habito: deletedHabito });
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al eliminar el hábito' });
            }
        });
    }   

    getHabitoById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const habito = await HabitoModel.findById(id)
                    .populate({
                        path: 'idActividad',
                        populate: {  // Segundo populate anidado para la categoría
                        path: 'idCategoria',
                        model: 'Categoria'  // Nombre del modelo de categoría
                        }
                    })
                    .populate('idUser');
                if (!habito) {
                    resolve({ status: 404, message: 'Hábito no encontrado' });
                } else {
                    resolve({ status: 200, message: 'Hábito encontrado', habito: habito });
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener el hábito' });
            }
        });
    }

    getHabitosNoActividadesRealizadas() {
        return new Promise(async (resolve, reject) => {
            try {
                // De los hábitos, traer los habitos que no tengan actividades realizadas
                const habitos = await HabitoModel.find({ actividadesRealizadas: { $exists: false } })
                .populate({
                    path: 'idActividad',
                    populate: {  // Segundo populate anidado para la categoría
                    path: 'idCategoria',
                    model: 'Categoria'  // Nombre del modelo de categoría
                    }
                })
                .populate('idUser');
                resolve(habitos);
            } catch (error) {
                console.log("error desdes el controller", error);
                reject({ status: 500, error: 'Error al obtener los hábitos sin actividades realizadas' });
            }
        });
    }

    putHabito(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedHabito = await HabitoModel.findByIdAndUpdate(id, body, { new: true });
                if (!updatedHabito) {
                    resolve({ status: 404, message: 'Hábito no encontrado' });
                } else {
                    resolve({ status: 200, message: 'Hábito actualizado correctamente', habito: updatedHabito });
                }
            } catch (error) {
                reject({ status: 500, error: 'Error al actualizar el hábito' });
            }
        });
    }   
}

module.exports = HabitoController;