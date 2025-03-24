const express = require('express');
const router = express.Router();
const ActividadController = require('../controllers/actividadController.js');

const actividadController = new ActividadController();

router.get('/', (req, res, next) => {
    actividadController.getActividades(req.body)
    .then((result) => {
        console.log("result get Actividades", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    actividadController.postActividad(req.body)
    .then((result) => {
        console.log("result post Actividad", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    actividadController.deleteActividad(req.params.id)
    .then((result) => {
        console.log("result delete Actividad", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/:id', (req, res, next) => {
    actividadController.getActividadById(req.params.id)
    .then((result) => {
        console.log("result get Actividad", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.put('/:id', (req, res, next) => {
    actividadController.putActividad(req.params.id, req.body)
    .then((result) => {
        console.log("result put Actividad", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;