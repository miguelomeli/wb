'use strict'

var express = require('express');
var paquetesController = require('../controllers/paquetes');
var api =  express.Router();
var md_auth = require('../middlewares/authenticated');




api.post('/paquete' , md_auth.ensureAuth , paquetesController.Insertar);
api.put('/paquete/:id' , md_auth.ensureAuth , paquetesController.Actualizar);
api.delete('/paquete/:id' , md_auth.ensureAuth , paquetesController.Eliminar);
api.get('/paquete/:id' , md_auth.ensureAuth , paquetesController.Detalle);
api.get('/paquetes/:page?' , md_auth.ensureAuth , paquetesController.Listado);





module.exports = api;