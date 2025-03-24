const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);


/*const Categorias = require('../database/dataBase.js').Categorias;

class CategoriesModel {
    getCategorias() {
        return new Promise((resolve, reject) => {
            try {
                resolve(Categorias);
            } catch (error) {
                reject(error);
            }
        });
    }

    postCategory(category) {
        return new Promise((resolve, reject) => {
            try {
                // Validar que no exista ya una categoría con el mismo nombre
                const categoryExists = Categorias.some(cat => cat.name === category.name);
                if (categoryExists) {
                    reject({ status: 400, message: 'Ya existe una categoría con ese nombre' });
                    return;
                }

                // Asignar un ID único a la nueva categoría
                category.id = Categorias.length + 1;

                // Guardar la nueva categoría
                Categorias.push(category);
                reject({ status: 201, message: 'Categoría creada correctamente', category });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear la categoría' });
            }
        });
    }
}

module.exports = CategoriesModel;*/


// para guardar una nueva categoria:
/*
{
    "name": "nombre de categoria nuevo"
}
*/