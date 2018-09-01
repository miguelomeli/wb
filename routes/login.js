'use strict'

var express = require('express');
var loginController = require('../controllers/login');
var api =  express.Router();
var md_auth = require('../middlewares/authenticated');


api.post('/registro' , loginController.Registro);
api.post('/login' , loginController.Login);


api.get('/check_1' , md_auth.ensureAuth , loginController.Check1);
api.get('/check_2' , md_auth.ensureAuth , loginController.Check2);







module.exports = api;