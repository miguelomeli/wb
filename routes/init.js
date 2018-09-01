'use strict'

var express = require('express');
var initController = require('../controllers/init');
var api =  express.Router();


api.post('/prueba' , initController.Post);
api.get('/prueba' , initController.Get);
api.put('/prueba' , initController.Put);
api.delete('/prueba' , initController.Delete);







module.exports = api;