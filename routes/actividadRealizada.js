const express = require('express');
const router = express.Router();
const ActividadRealizadaController = require('../controllers/actividadRealizadaController.js');

const actividadRealizadaController = new ActividadRealizadaController();

router.get('/', (req, res, next) => {
    actividadRealizadaController.getActRealizadas(req.body)
    .then((result) => {
        console.log("result get Actividades Realizadas", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    actividadRealizadaController.postActividadRealizada(req.body)
    .then((result) => {
        console.log("result post Actividad Realizada", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/actividades-realizadas-por-fechas', (req, res, next) => {
    actividadRealizadaController.getActividadesRealizadasPorFechas(req.query)
    .then((result) => {
        console.log("result get Actividades Realizadas por Fechas", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/actividadesrealizadas-name', (req, res, next) => {
    actividadRealizadaController.getActividadesRealizadasPorNombreActividad(req.query)
    .then((result) => {
        console.log("result get Actividades Realizadas por Nombre", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/actividades-activas', (req, res, next) => {
    actividadRealizadaController.getActividadesAbiertas(req.body)
    .then((result) => {
        console.log("result get Actividades Abiertas", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    actividadRealizadaController.deleteActividadRealizada(req.params.id)
    .then((result) => {
        console.log("result delete Actividad Realizada", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.put('/:id', (req, res, next) => {
    actividadRealizadaController.putActividadRealizada(req.params.id, req.body)
    .then((result) => {
        console.log("result put Actividad Realizada", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;