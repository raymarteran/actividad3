const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../config/config.js');
 
// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado, No tiene persmisos' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send('Error al autenticar el token');
        }
        req.userId = decoded.id;
        next();
    });
};

// Función para generar un token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, secretKey, { expiresIn: '24h' }); //tiempo de sesion 24 horas
};

module.exports = {
    verifyToken,
    generateToken,
};