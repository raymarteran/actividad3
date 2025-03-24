const User = require('../models/userModel.js');
const Actividad = require('../models/actividadModel.js');
const Categoria = require('../models/categoriesModel.js');
const ActRealizada = require('../models/actRealizadaModel.js');
const bcrypt = require('bcrypt');

class UsersController {
    getUsers(req, res) {
        return new Promise((resolve, reject) => {
            try {
                const users = User.find();
                if (users.length === 0) {
                    resolve({message: 'No se encontraron usuarios'});
                }
                resolve(users);
            } catch (error) {
                reject(error);
            }
        })
    }

    getActividadesCategoriaUsuario = async (idUser, nameCategoria) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = parseInt(idUser);

                // Buscar la categoría por nombre
                const categoria = await Categoria.findOne({ name: nameCategoria });
                if (!categoria) {
                    resolve({ status: 404, message: 'Categoría no encontrada' });
                }

                // Buscar las actividades del usuario para la categoría dada
                const actividades = await Actividad.find({
                    idUser: userId,
                    idCategoria: categoria.id
                }).populate('idCategoria'); // Opcional: poblar la información de la categoría

                if (!actividades || actividades.length === 0) {
                    resolve({ status: 404, message: 'No se encontraron actividades de ese usuario para esa categoría' });
                }

                resolve(actividades);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
                reject({ status: 500, message: 'Error interno del servidor', error });
            }
        });
    }

    postUser = async (body) => {
        let newUser = body;
    
        return new Promise(async (resolve, reject) => {
            try {
                // Obtener todos los usuarios (esperar a que se resuelva la promesa)
                const allUsers = await User.find(); // Esto devolverá un array (puede estar vacío)
    
                // Validar que todos los campos estén completos
                if (!newUser.name || !newUser.lastName || !newUser.userName || !newUser.email || !newUser.password || !newUser.repassword) {
                    reject({ status: 400, error: 'Todos los campos son obligatorios' });
                    return;
                }
    
                // Validar que el email sea único
                const emailExists = allUsers.some(user => user.email === newUser.email);
                if (emailExists) {
                    reject({ status: 400, error: 'El email ya existe' });
                    return;
                }
    
                // Validar que las contraseñas coincidan
                if (newUser.password !== newUser.repassword) {
                    reject({ status: 400, error: 'Las contraseñas no coinciden' });
                    return;
                }
    
                // Encriptar la contraseña
                newUser.password = bcrypt.hashSync(newUser.password, 10);
                delete newUser.repassword; // Eliminar el campo repassword
    
                // Guardar el usuario
                const user = new User(newUser); // Crear una instancia del modelo
                await user.save(); // Guardar en la base de datos
    
                resolve({ status: 201, message: 'Usuario creado correctamente', user });
            } catch (error) {
                console.error("Error en postUser:", error);
                reject({ status: 500, error: 'Error al crear el usuario' });
            }
        });
    };

    deleteUser = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ id: id });
                if (!user) {
                    resolve({ status: 404, message: 'Usuario no encontrado' });
                }
                await User.deleteOne({ id: id });
                resolve({ status: 200, message: 'Usuario eliminado correctamente'});
            } catch (error) {
                console.error("Error en deleteUser:", error);
                reject({ status: 500, error: 'Error al eliminar el usuario' });
            }
        });
    };

    getUserById = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ id: id });
                resolve({ status: 200, message: 'Usuario encontrado correctamente', user });
            } catch (error) {
                console.error("Error en getUserById:", error);
                reject({ status: 500, error: 'Error al obtener el usuario' });
            }
        });
    };

    updateUser = async (id, body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ id: id });
                if (!user) {
                    resolve({ status: 404, message: 'Usuario no encontrado' });
                }
                await User.updateOne({ id: id }, body);
                resolve({ status: 200, message: 'Usuario actualizado correctamente', user });
            } catch (error) {
                console.error("Error en updateUser:", error);
                reject({ status: 500, error: 'Error al actualizar el usuario' });
            }
        });
    };

    getLastActividadesRealizadas = async (idUser) => {
        return new Promise(async (resolve, reject) => {
            try {
                const actividadesRealizadas = await ActRealizada.find({ idUser: idUser }).sort({ dateFinal: -1 }).limit(5);
                resolve(actividadesRealizadas); // Devolver las actividades realizadas
            } catch (error) {
                console.error("Error en getLastActividadesRealizadas:", error);
                reject({ status: 500, error: 'Error al obtener las actividades realizadas' });
            }
        });
    };
}

module.exports = UsersController;