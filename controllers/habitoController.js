const HabitoModel = require('../models/habitoModel.js');

class HabitoController {
    constructor() {
        this.habitoModel = new HabitoModel();
    }

    getHabitos() {
        return new Promise(async (resolve, reject) => {
            try {
                const habitos = await this.habitoModel.getHabitos();
                resolve(habitos);
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener los hábitos' });
            }
        });
    }

    postHabito(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const newHabito = body;

                // Validar si ya existe un hábito con el mismo nombre
                const habitos = await this.habitoModel.getHabitos();
                const exists = habitos.some(hab => hab.name === newHabito.name);
                if (exists) {
                    resolve({ status: 400, message: 'Ya existe un hábito con ese nombre' });
                    return;
                }

                // Guardar el nuevo hábito
                const habitoCreado = await this.habitoModel.postHabito(newHabito);
                resolve({ status: 201, message: 'Hábito creado correctamente', habito: habitoCreado });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear el hábito' });
            }
        });
    }

    getHabitosNoActividadesRealizadas() {
        return new Promise(async (resolve, reject) => {
            try {
                const habitos = await this.habitoModel.getHabitosNoActividadesRealizadas();
                resolve(habitos);
            } catch (error) {
                reject({ status: 500, error: 'Error al obtener los hábitos sin actividades realizadas' });
            }
        });
    }
}

module.exports = HabitoController;