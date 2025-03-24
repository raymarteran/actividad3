const express = require('express');
const router = express.Router();
const HabitoController = require('../controllers/habitoController.js');

const habitoController = new HabitoController();

router.get('/', (req, res, next) => {
    habitoController.getHabitos(req.body)
    .then((result) => {
        console.log("result get Habitos", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    habitoController.postHabito(req.body)
    .then((result) => {
        console.log("result post Habito", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/habitos-no-actividades-realizadas', (req, res, next) => {
    habitoController.getHabitosNoActividadesRealizadas(req.body)
    .then((result) => {
        console.log("result get Habitos sin actividades realizadas", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;