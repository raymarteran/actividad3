const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController.js');

const categoriaController = new CategoriaController();

router.get('/', (req, res, next) => {
    categoriaController.getCategorias(req.body)
    .then((result) => {
        console.log("result get Categorias", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    categoriaController.deleteCategoria(req.params.id)
    .then((result) => {
        console.log("result delete Categoria", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/:id', (req, res, next) => {
    categoriaController.getCategoria(req.params.id)
    .then((result) => {
        console.log("result get Categoria", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.put('/:id', (req, res, next) => {
    categoriaController.putCategoria(req.params.id, req.body)
    .then((result) => {
        console.log("result put Categoria", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    console.log("req.body", req.body);
    categoriaController.postCategoria(req.body)
    .then((result) => {
        console.log("result post Categoria", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;