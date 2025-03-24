const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController.js');
const { generateToken } = require('../middlewares/auth.js');

const usersController = new UsersController();

// Registro de usuario
router.post('/register', async (req, res, next) => {
    try {
        const { name, lastName, userName, email, password, repassword } = req.body;
        const newUser = { 
            name,
            lastName,
            email,
            userName,
            password,
            repassword
        };
        usersController.postUser(newUser)
        .then((user) => {
            console.log('respuesta del usersController', user)
            res.status(201).json(user);
        })
        .catch(error => {
            console.log("error del auth al hacer postUser", error)
            if (error.status === 400) {
                return res.status(400).json({ message: error.error });
            }
            next(error);
        });
    } catch (error) {
        next(error);
    }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("username o correo a buscar", email)
        usersController.loginUser(email, password)
        .then(async (user) => {
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            res.json(user)
        })
        .catch(next);
    } catch (error) {
        console.log("error del auth al hacer loginUser", error)
        if (error.status === 400) {
            return res.status(400).json({ message: error.error });
        }
        next(error);
    }
});

module.exports = router;