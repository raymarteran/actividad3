const express = require('express');
const router = express.Router();
const HabitoController = require('../controllers/habitoController.js');

const habitoController = new HabitoController();

router.get('/', (req, res, next) => {
    habitoController.getHabitos(req.body)
    .then((result) => {
        //console.log("result get Habitos", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/habitosSinActRealizadas', (req, res, next) => {
    habitoController.getHabitosNoActividadesRealizadas(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    console.log("req.body", req.body);
    habitoController.postHabito(req.body)
    .then((result) => {
        console.log("result post Habito", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    habitoController.deleteHabito(req.params.id)
    .then((result) => {
        console.log("result delete Habito", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/:id', (req, res, next) => {
    habitoController.getHabitoById(req.params.id)
    .then((result) => {
        console.log("result get Habito", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.put('/:id', (req, res, next) => {
    habitoController.putHabito(req.params.id, req.body)
    .then((result) => {
        console.log("result put Habito", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;