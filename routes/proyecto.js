const express = require('express');
const router = express.Router();
const ProyectoController = require('../controllers/proyectoController.js');

const proyectoController = new ProyectoController();

router.get('/', (req, res, next) => {
    proyectoController.getProyectos(req.body)
    .then((result) => {
        console.log("result get Proyectos", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/actividades-realizadas/:id', (req, res, next) => {
    proyectoController.getActividadesRealizadas(req.params.id)
    .then((result) => {
        console.log("resultado de actividades realizadas", result);
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    proyectoController.postProyecto(req.body)
    .then((result) => {
        console.log("result post Proyecto", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/tiempo-usado', (req, res, next) => {
    proyectoController.getTiempoUsado(req.body)
    .then((result) => {
        console.log("result tiempo usado", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    proyectoController.deleteProyecto(req.params.id)
    .then((result) => {
        console.log("result delete Proyecto", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;