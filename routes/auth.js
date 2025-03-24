const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController.js');
const { generateToken } = require('../middlewares/auth.js');

const usersController = new UsersController();

// Registro de usuario
router.post('/register', async (req, res, next) => {
    try {
        const { name, lastName, userName, email, password } = req.body;
        const newUser = { 
            name,
            lastName,
            email,
            userName,
            password
        };
        
        usersController.postUser(newUser)
        .then((user) => {
            const token = generateToken(user);
            res.status(201).json({ 
                token,
                user: {
                    id: user.id,
                    userName: user.userName
                }
            });
        })
        .catch(next);
    } catch (error) {
        next(error);
    }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        usersController.getUserByUsername(username)
        .then(async (user) => {
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
            
            const token = generateToken(user);
            res.json({ 
                token,
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        })
        .catch(next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;