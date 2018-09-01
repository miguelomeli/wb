'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//cargar Rutas
var init_routes = require('./routes/init');
var login_routes = require('./routes/login');
var paquetes_routes = require('./routes/paquetes');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Configurar Cabezeras HTTP
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin , X-Requested-With , Content-Type , Accept , Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT , DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT , DELETE');
    next();
});



app.use('/api', init_routes);
app.use('/api', login_routes);
app.use('/api', paquetes_routes);






app.get('*', function(req, res){
    res.status(500).send({status:false , msg:'ERROR'});
});


app.post('*', function(req, res){
    res.status(500).send({status:false , msg:'ERROR'});
});



module.exports = app;