const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HabitoSchema = new Schema({
  name: { type: String, required: true, unique: true },
  idActividad: { type: Number, required: true },
  idUser: { type: Number, required: true }
});

module.exports = mongoose.model('Habito', HabitoSchema);



/*const Habitos = require('../database/dataBase.js').Habitos;
const Actividades = require('../database/dataBase.js').Actividades;
const ActRealizada = require('../database/dataBase.js').ActRealizada;

class HabitoModel {
    getHabitos() {
        return Habitos.map(hab => {
            const actividades = Actividades ? Actividades.find(act => act.id === hab.idActividad) : [];
            return {
                ...hab,
                actividades: actividades ? actividades : []
            };
        });
    }

    postHabito(habito) {
        return new Promise((resolve, reject) => {
            try {
                Habitos.push(habito);
                resolve(habito);
            } catch (error) {
                reject(error);
                console.log(error);
            }
        });
    }

    getHabitosNoActividadesRealizadas() {
        return new Promise((resolve, reject) => {
            try {
                // De los hábitos, traer la información de las actividades y de las actividades las actividades realizadas
                const habitos = Habitos.map(hab => ({ 
                    ...hab, 
                    actividades: Actividades.filter(act => act.id === hab.idActividad) 
                }));

                // Agregar también por cada actividad las actividades realizadas
                const habitosActividadesRealizadas = habitos.map(hab => ({ 
                    ...hab, 
                    actividades: hab.actividades.map(act => ({ 
                        ...act, 
                        actividadesRealizadas: ActRealizada.filter(actR => actR.idActividad === act.id) 
                    })) 
                }));

                // Filtrar los hábitos que no tienen actividades realizadas
                const habitosNoActividadesRealizadas = habitosActividadesRealizadas.filter(hab => 
                    !hab.actividades.some(act => act.actividadesRealizadas.length > 0)
                );

                resolve(habitosNoActividadesRealizadas);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = HabitoModel;*/


// para guardar una nueva categoria:
/*
{
    "name": "Hábito 1",
    "idActividad": 1,
    "idUser": 1
}
*/